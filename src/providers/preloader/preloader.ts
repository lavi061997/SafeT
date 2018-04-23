import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the PreloaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreloaderProvider {

   private loading : any;

   constructor( public http        : Http,
                public loadingCtrl : LoadingController)
   {
   }



   displayPreloader()
   {
      this.loading = this.loadingCtrl.create({
         content: 'Please wait...'
      });

      this.loading.present();
   }



   hidePreloader()
   {
      this.loading.dismiss();
   }

}
