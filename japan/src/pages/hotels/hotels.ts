import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import Hotel from '../../models/hotel';
import { HotelDetailsPage } from '../hoteldetails/hoteldetails';

import { LocalsProvider } from '../../providers/locals';

@Component({
  selector: 'page-hotels',
  templateUrl: 'hotels.html',
})
export class HotelsPage {
  hotels: Hotel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public locals: LocalsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelsPage');
    this.locals.getHotels().subscribe(response => {
      this.hotels = response;
    }, err => {
      console.log(err);
    });
  }

  openDetails(hotel: Hotel) {
    this.navCtrl.push(HotelDetailsPage, {
      hotel: hotel
    });
  }
}
