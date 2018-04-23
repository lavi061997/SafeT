import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';


@Injectable()
export class DatabaseProvider {

   constructor(public http: Http)
   {
   }


   addToDatabase(transObj, key) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         let ref = firebase.database().ref('users/');
         ref.child(key).push(transObj);
         let id = transObj.receiverId;
         let amount = transObj.amount;


         resolve(true);
     });
   }

   uploadImage(imageString) : Promise<any>
   {
      let image       : string  = 'transaction-' + new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;

      return new Promise((resolve, reject) =>
      {
         storageRef       = firebase.storage().ref('userimages/' + image);
         parseUpload      = storageRef.putString(imageString, 'data_url');

         parseUpload.on('state_changed', (_snapshot) =>
         {
         },
         (_err) =>
         {
            reject(_err);
         },
         (success) =>
         {
            resolve(parseUpload.snapshot);
         });
      });
   }


}
