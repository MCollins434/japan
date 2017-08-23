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
  celcious: string;
  km: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversionsPage');
  }

  onKey(value: string) {
    let f: number;
    f = +value as number;
    this.celcious = ''+ (f - 32 * (5 / 9));
  }

}
