import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Do, Dont } from '../../models/dosdonts';
import { LocalsProvider } from '../../providers/locals';

@Component({
  selector: 'page-customs',
  templateUrl: 'customs.html',
})
export class CustomsPage {
  dos: Do[];
  donts: Dont[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public locals: LocalsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomsPage');
    
    this.locals.getDos().subscribe(response => {
      this.dos = response;
    }, err => {
      console.log(err);
    });

    this.locals.getDonts().subscribe(response => {
      this.donts = response;
    }, err => {
      console.log(err);
    });
  }

}
