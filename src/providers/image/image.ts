import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class ImageProvider {

   public cameraImage : String

   constructor(public http     : Http,
               private _CAMERA : Camera)
   {
   }


   selectImage() : Promise<any>
   {
      return new Promise(resolve =>
      {
         let cameraOptions : CameraOptions = {
             quality: 100,
             destinationType: this._CAMERA.DestinationType.DATA_URL,
             encodingType: this._CAMERA.EncodingType.JPEG,
             mediaType: this._CAMERA.MediaType.PICTURE
         };

         this._CAMERA.getPicture(cameraOptions)
         .then((data) =>
         {
            this.cameraImage = "data:image/jpeg;base64," + data;
            resolve(this.cameraImage);
         });


      });
   }

}
