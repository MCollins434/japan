import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TranslationsPage } from '../pages/translations/translations';
import { CustomsPage } from '../pages/customs/customs';
import { ConversionsPage } from '../pages/conversions/conversions';
import { PlacesPage } from '../pages/places/places';
import { PlaceDetailPage } from '../pages/placedetail/placedetail';
import { HotelsPage } from '../pages/hotels/hotels';
import { HotelDetailsPage } from '../pages/hoteldetails/hoteldetails';
import { FlightsPage } from '../pages/flights/flights';
import { LinksPage } from '../pages/links/links';
import { DocsPage } from '../pages/docs/docs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DataProvider } from '../providers/data';

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
    PlacesPage,
    PlaceDetailPage,
    HotelsPage,
    HotelDetailsPage,
    FlightsPage,
    DocsPage,
    LinksPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TranslationsPage,
    CustomsPage,
    ConversionsPage,
    PlacesPage,
    PlaceDetailPage,
    HotelsPage,
    HotelDetailsPage,
    FlightsPage,
    DocsPage,
    LinksPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    File,
    DataProvider,
    Storage
  ]
})
export class AppModule {}
