import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import Flight from '../../models/flight';
import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-flights',
  templateUrl: 'flights.html',
})
export class FlightsPage {
  flights: Flight[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightsPage');
    this.data.getFlights().then((resp) => {
      this.flights = resp;
    })
  }

}
