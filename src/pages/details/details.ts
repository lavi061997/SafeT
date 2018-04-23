import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, Platform  } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/database/database';
import { DataProvider } from '../../providers/data/data';
import { Toast } from '@ionic-native/toast';

import * as firebase from 'firebase';
import 'rxjs/Rx';

import { ModalsPage } from '../modals/modals';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

    myname: any;
private auth     : any;
private email    : string;
private pass     : string;
private info     : any;
private key      : string;
private base64Image : any;

constructor(public navCtrl: NavController, public navParams: NavParams,
  private camera: Camera,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController, private platform: Platform, private modalCtrl: ModalController, private _IMG: ImageProvider, private _LOADER: PreloaderProvider, private _DB: DatabaseProvider, private _DATA: DataProvider, private toast: Toast) {
      this.email = navParams.get("email");
      this.pass = navParams.get("password");
  }

  loadAndParseMovies()
 {
    this._LOADER.hidePreloader();
 }

getImage() {

const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64Image = 'data:image/jpeg;base64,' + imageData;
 let img = {
     "image": this.base64Image,
     "gallery_name": "mygallery",
     "subject_id": this.myname || "common"
 }
 this._DATA.enroll(img)
    .subscribe(res => this.info = res)

}, (err) => {
    this.toast.show(`Error in submitting`, '5000', 'center').subscribe(
  toast => {
    console.log(toast);
  }
);
});
}

addRecord()
{
   let modal = this.modalCtrl.create(ModalsPage, {key: this.key});
   modal.onDidDismiss((data) =>
   {
      if(data)
      {
         this.loadAndParseMovies();
      }
   });
   modal.present();
}


ionViewDidEnter() {
    this._LOADER.displayPreloader();
this.platform.ready()
.then(() => {
    //firebase.initializeApp(firebaseConfig);
    console.log("jio");
})
.then(() =>
{
   firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
   .then((credentials) =>
   {
       let user = {
           email: credentials.email,
           uid: credentials.uid,
           amount: 0
       }

       console.log(user);

       let Ref = firebase.database().ref('users/');

       let a = Ref.push(user);
       this.key = a.key;
      this.loadAndParseMovies();
   })
   .catch((err : Error) =>
   {
      console.log(err.message);
   });
});
}


}
