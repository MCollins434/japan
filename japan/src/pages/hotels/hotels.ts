import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import Hotel from '../../models/hotel';
import { HotelDetailsPage } from '../hoteldetails/hoteldetails';

import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-hotels',
  templateUrl: 'hotels.html',
})
export class HotelsPage {
  hotels: Hotel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelsPage');
    this.data.getHotels().then((response) => {
      this.hotels = response;
    }, (err) => {
      console.log(err);
    });
  }

  openDetails(hotel: Hotel) {
    this.navCtrl.push(HotelDetailsPage, {
      hotel: hotel
    });
  }
}
