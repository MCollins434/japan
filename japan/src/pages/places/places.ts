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
  cities: CityPlaces[] = [];
  places: Place[];
  tokyo: string = "TOKYO";
  hakone: string = "HAKONE";
  hiroshima: string = "HIROSHIMA";
  kyoto: string = "KYOTO";
  showCity = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
    this.data.getPlaces().then((response) => {
      this.places = response;
      let tokyoPlaces = this.places.filter((place) => place.city.toUpperCase() == this.tokyo.toUpperCase());
      let hakonePlaces = this.places.filter((place) => place.city.toUpperCase() == this.hakone.toUpperCase());
      let hiroshimaPlaces = this.places.filter((place) => place.city.toUpperCase() == this.hiroshima.toUpperCase());
      let kyotoPlaces = this.places.filter((place) => place.city.toUpperCase() == this.kyoto.toUpperCase());
      let otherPlaces = this.places.filter((place) =>
        place.city.toUpperCase() != this.tokyo.toUpperCase() &&
        place.city.toUpperCase() != this.hakone.toUpperCase() &&
        place.city.toUpperCase() != this.hiroshima.toUpperCase() &&
        place.city.toUpperCase() != this.kyoto.toUpperCase());

      let hiroshima: CityPlaces = { name: "Hiroshima", places: hiroshimaPlaces };
      let tokyo: CityPlaces = { name: "Tokyo", places: tokyoPlaces };
      let hakone: CityPlaces = { name: "Hakone", places: hakonePlaces };
      let kyoto: CityPlaces = { name: "Kyoto", places: kyotoPlaces };
      let others: CityPlaces = { name: "Others", places: otherPlaces };

      this.cities.push(tokyo);
      this.cities.push(hakone);
      this.cities.push(hiroshima);
      this.cities.push(kyoto);
      this.cities.push(others);
    });
  }
  openDetails(place: Place) {
    this.navCtrl.push(PlaceDetailPage, {
      place: place
    });
  }
  toggleCity(idx) {
    if(this.isCityShown(idx)) {
      this.showCity = null;
    } else {
      this.showCity = idx;
    }
  }
  isCityShown(idx){
    return this.showCity === idx;
  }
}

export class CityPlaces {
  name: string;
  places: Place[];
}