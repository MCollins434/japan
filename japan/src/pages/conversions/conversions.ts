import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConversionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-conversions',
  templateUrl: 'conversions.html',
})
export class ConversionsPage {
  farht: string;
  usd: string;
  miles: string;
  celc: number;
  yen: number;
  km: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversionsPage');
    this.yen = 500;
    this.celc = 30;
    this.km = 5;
    this.convert();
  }

  convert() {
    this.farht = ''+ (((this.celc * 9) / 5) + 32).toFixed(2);
    this.miles = '' + (this.km * 0.62137119).toFixed(2);
    this.usd = '' + (this.yen * 0.0091);
  }
}
