import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-links',
  templateUrl: 'links.html',
})
export class LinksPage {
  links: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinksPage');
    this.links = this.data.getLinks();
  }

}
