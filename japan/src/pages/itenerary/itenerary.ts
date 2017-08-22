import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IteneraryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-itenerary',
  templateUrl: 'itenerary.html',
})
export class IteneraryPage {
  events: Array<{title: string, time: Date, place: string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.events = [];
    this.events.push({
      title: 'Flight DCA to CHG',
      time: new Date(2017,9,4,8,30),
      place: 'Reagan'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IteneraryPage');
  }

}
