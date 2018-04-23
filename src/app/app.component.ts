import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyCddnH3TUHhm9SUAll9xpZq7vmFxM3A2cs",
  authDomain: "safet-d12a2.firebaseapp.com",
  databaseURL: "https://safet-d12a2.firebaseio.com",
  projectId: "safet-d12a2",
  storageBucket: "safet-d12a2.appspot.com",
  messagingSenderId: "341402787348"
};


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
          firebase.initializeApp(firebaseConfig);
  }
}
