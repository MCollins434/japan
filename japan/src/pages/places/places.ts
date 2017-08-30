import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlaceDetailPage } from '../placedetail/placedetail';
import Place from '../../models/place';
import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  places: Place[];
  tokyoPlaces: Place[];
  hakonePlaces: Place[];
  hiroshimaPlaces: Place[];
  kyotoPlaces: Place[];
  otherPlaces: Place[];

  tokyo: string = "TOKYO";
  hakone: string = "HAKONE";
  hiroshima: string = "HIROSHIMA";
  kyoto: string = "KYOTO";

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
    this.data.getPlaces().then((response) => {
      this.places = response;
      this.tokyoPlaces = this.places.filter((place) => place.city.toUpperCase() == this.tokyo.toUpperCase());
      this.hakonePlaces = this.places.filter((place) => place.city.toUpperCase() == this.hakone.toUpperCase());
      this.hiroshimaPlaces = this.places.filter((place) => place.city.toUpperCase() == this.hiroshima.toUpperCase());
      this.kyotoPlaces = this.places.filter((place) => place.city.toUpperCase() == this.kyoto.toUpperCase());
      this.otherPlaces = this.places.filter((place) =>
        place.city.toUpperCase() != this.tokyo.toUpperCase() &&
        place.city.toUpperCase() != this.hakone.toUpperCase() &&
        place.city.toUpperCase() != this.hiroshima.toUpperCase() &&
        place.city.toUpperCase() != this.kyoto.toUpperCase());
    });
  }
  getDetail(place: Place) {
    this.navCtrl.push(PlaceDetailPage, {
      place: place
    });
  }
}
