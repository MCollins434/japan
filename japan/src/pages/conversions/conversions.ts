import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data";
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
  rate: number;
  farht: string;
  usd: number;
  miles: string;
  celc: number;
  yen: number;
  km: number;
  cs: {usd: number, yen: number}[] = [];
  lastUpdated: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public data: DataProvider) {
    let yens = [500, 1000, 2000,3000,4000, 5000, 10000, 12000,15000, 20000];
    yens.map((yen) => {
      this.cs.push({usd: this.getUSD(yen), yen: yen});
    });
    this.lastUpdated = "2017-08-30";
    this.rate = 110.15;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversionsPage');
    if(navigator.onLine) {
      this.updateExRate();
    };
    this.yen = 500;
    this.celc = 30;
    this.km = 5;
    this.convert();
  }

  getUSD(yen: any): number {
    return yen / this.rate;
  }
  convert() {
    this.farht = ''+ (((this.celc * 9) / 5) + 32).toFixed(2);
    this.miles = '' + (this.km * 0.62137119).toFixed(2);
    this.usd = this.getUSD(this.yen);
  }

  updateExRate() {
    this.data.getExchangeRate().then((resp) => {
      this.lastUpdated = resp.date;
      this.rate = resp.rate;
    });
  }
}
