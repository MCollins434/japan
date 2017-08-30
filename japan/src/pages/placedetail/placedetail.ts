import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlacedetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-placedetail',
  templateUrl: 'placedetail.html',
})
export class PlaceDetailPage {
  place: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.place = navParams.get('place');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacedetailPage');
  }

}
