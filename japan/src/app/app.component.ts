import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TranslationsPage } from '../pages/translations/translations';
import { CustomsPage } from '../pages/customs/customs';
import { ConversionsPage } from '../pages/conversions/conversions';
import { PlacesPage } from '../pages/places/places';
import { HotelsPage } from '../pages/hotels/hotels';
import { FlightsPage } from '../pages/flights/flights';
import { LinksPage } from '../pages/links/links';
import { DocsPage } from '../pages/docs/docs';
import { HelpPage } from '../pages/help/help';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Places', component: PlacesPage },
      { title: 'Flights', component: FlightsPage },
      { title: 'Hotels', component: HotelsPage },
      { title: 'Links', component: LinksPage },
      { title: 'Docs', component: DocsPage },
      { title: 'Translations', component: TranslationsPage },
      { title: 'Customs', component: CustomsPage },
      { title: 'Conversions', component: ConversionsPage },
      { title: 'Help', component: HelpPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
