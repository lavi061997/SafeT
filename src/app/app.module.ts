import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { ModalsPage } from '../pages/modals/modals';

import { DataProvider } from '../providers/data/data';
import { Camera } from '@ionic-native/camera';
import { DatabaseProvider } from '../providers/database/database';
import { ImageProvider } from '../providers/image/image';
import { PreloaderProvider } from '../providers/preloader/preloader';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { Toast } from '@ionic-native/toast';
import { NetworkInterface } from '@ionic-native/network-interface';
import { CardIO } from '@ionic-native/card-io';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    ModalsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    ModalsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    Camera,
    DatabaseProvider,
    ImageProvider,
    PreloaderProvider,
    Geolocation,
    Device,
    Toast,
    NetworkInterface,
    CardIO
]
})
export class AppModule {}
