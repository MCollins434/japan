import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DbProvider } from '../../providers/db/db';

@Component({
  selector: 'page-links',
  templateUrl: 'links.html',
})
export class LinksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinksPage');
    console.log("FALLBACKS");
    this.db.printFallbacks();
    console.log("LATEST");
    this.db.printLatest();
  }

}
