import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

import * as firebase from 'firebase';

import { Toast } from '@ionic-native/toast';
import { CardIO } from '@ionic-native/card-io';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public password: any;
  public email: any;

  constructor(public navCtrl: NavController, private toast: Toast, private cardIO: CardIO) {
  }
  signin() {


        this.navCtrl.push(DetailsPage, {
            email: this.email,
            password: this.password
        });

  }

}
