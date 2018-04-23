import { Component } from '@angular/core';
import { IonicPage,NavController,ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase';

import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { DataProvider } from '../../providers/data/data';
import { Toast } from '@ionic-native/toast';
import { NetworkInterface } from '@ionic-native/network-interface';

/**
 * Generated class for the ModalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html',
})
export class ModalsPage {


    myName: any;
 public postForm          : FormGroup;
 public personImage       : any     = '';
 public time              : string     = '';
 public transactionId     : string  = '';
 public isVerified        : boolean = true;
 public receiverId        : string = '';
 public senderId          : string;
 public amount            : number = 0;
 public date              : string = '';
 public longitude         : number;
 public latitude          : number;
 public uuid              : any;
 public os                : any;
 public model             : any;
 public info              : any;
 public transactions      : any;
 public carrierIp         : any;
 public wifiIp            : any;
 public key               : string;
 public show              : boolean = false;


 constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder, private _IMG: ImageProvider, public viewCtrl: ViewController, private _LOADER: PreloaderProvider, private _DB: DatabaseProvider, private geolocation: Geolocation, private device: Device, private _DATA: DataProvider, private toast: Toast, private networkInterface: NetworkInterface) {

      this.postForm = _FB.group({
          'amount' : [null, Validators.required],
          'receiverId' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(75)])],
          'image'      : ['', Validators.required]
      });

    this.transactions = firebase.database().ref('users/{id}/transactions/');
    firebase.auth().onAuthStateChanged((user) => {
         if (user) {
             this.senderId = user.uid;
         }
   });

   this.key = navParams.get('key');

  }


 getuid(email){
     firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
       console.log(providers);
     })  }
 saveTransaction(val)
 {

    this.toast.show(`saveTransaction`, '5000', 'center').subscribe(
                       toast => {
                           console.log(toast);
                       }
                       );
    this._LOADER.displayPreloader();

    let receiverId	: string		= this.postForm.controls["receiverId"].value,
        amount  	: number		= this.postForm.controls["amount"].value

    let currentdate = new Date();
    this.date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/"  + currentdate.getFullYear()

    this.time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    this.networkInterface.getWiFiIPAddress( )
        .then(val => this.wifiIp = val)

    this.networkInterface.getCarrierIPAddress()
        .then(val => this.carrierIp = val)

    this.geolocate();

    this.uuid = this.device.uuid;

    this.os = this.device.platform;

    this.model = this.device.model;

    if(this.isVerified){
       this._DB.uploadImage(this.personImage)
       .then((snapshot : any) =>
       {
          let uploadedImage : any = snapshot.downloadURL;

          this.toast.show(`Data Added`, '5000', 'center').subscribe(
                            toast => {
                                console.log(toast);
                            }
                            );

          this._DB.addToDatabase({
             receiverId    : receiverId,
             image    : uploadedImage,
             amount  : amount,
             senderId   : this.senderId,
             uuid   : this.uuid,
             os     : this.os,
             model : this.model,
             date : this.date,
             time : this.time,
             carrierIp: this.carrierIp || '',
             wifiIp: this.wifiIp|| ''
         }, this.key)
          .then((data) =>
          { this.toast.show(`Data finally Added`, '5000', 'center').subscribe(
                            toast => {
                                console.log(toast);
                            }
                            );
             this._LOADER.hidePreloader();
          });
       });
   }
       this.closeModal(true);
}

    closeModal(val = null)
    {
       this.viewCtrl.dismiss(val);
    }



    selectImage()
    {
       this._IMG.selectImage()
       .then((data) =>
       {
          this.personImage = data;
          let img = {
              "image": data,
              "gallery_name": "mygallery",
              "subject_id": this.myName
          }
          this._DATA.verify(img)
            .subscribe(res => this.info = res)

            this.toast.show('success', '5000', 'center').subscribe(
                    toast => {
                    console.log(toast);
                }
);

       });
    }


    geolocate() {
    this.geolocation.getCurrentPosition().then((resp) => {
    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
    }).catch((error) => {
    console.log('Error getting location', error);
    });

    }

    showPara( ) {
        this.show = !this.show;
    }

 }
