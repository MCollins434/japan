import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Do, Dont } from '../../models/dosdonts';
import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-customs',
  templateUrl: 'customs.html',
})
export class CustomsPage {
  dos: Do[];
  donts: Dont[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomsPage');
    
    this.data.getDos().then((resp) => {
      this.dos = resp;
    });
    this.data.getDonts().then((resp) => {
      this.donts = resp;
    });
  }
}
