import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TranslationsPage } from '../pages/translations/translations';
import { CustomsPage } from '../pages/customs/customs';
import { ConversionsPage } from '../pages/conversions/conversions';
import { IteneraryPage } from '../pages/itenerary/itenerary';
import { TodoDetailsPage } from '../pages/tododetails/tododetails';
import { PlacesPage } from '../pages/places/places';
import { HotelsPage } from '../pages/hotels/hotels';
import { HotelDetailsPage } from '../pages/hoteldetails/hoteldetails';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalsProvider } from '../providers/locals';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '2d0b0b8e'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TranslationsPage,
    CustomsPage,
    ConversionsPage,
    IteneraryPage,
    TodoDetailsPage,
    PlacesPage,
    HotelsPage,
    HotelDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TranslationsPage,
    CustomsPage,
    ConversionsPage,
    IteneraryPage,
    TodoDetailsPage,
    PlacesPage,
    HotelsPage,
    HotelDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalsProvider,
    Network
  ]
})
export class AppModule {}
