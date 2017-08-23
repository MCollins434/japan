import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TranslationsPage } from '../pages/translations/translations';
import { CustomsPage } from '../pages/customs/customs';
import { ConversionsPage } from '../pages/conversions/conversions';
import { IteneraryPage } from '../pages/itenerary/itenerary';
import { TodoDetailsPage } from '../pages/tododetails/tododetails';
import { PlacesPage } from '../pages/places/places';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TodosProvider } from '../providers/todos/todos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TranslationsPage,
    CustomsPage,
    ConversionsPage,
    IteneraryPage,
    TodoDetailsPage,
    PlacesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TranslationsPage,
    CustomsPage,
    ConversionsPage,
    IteneraryPage,
    TodoDetailsPage,
    PlacesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodosProvider
  ]
})
export class AppModule {}
