import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import Hotel from '../../models/hotel';
/**
 * Generated class for the HoteldetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-hoteldetails',
  templateUrl: 'hoteldetails.html',
})
export class HotelDetailsPage {
  hotel: Hotel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hotel = navParams.get('hotel');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HoteldetailsPage');
  }

}
