import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { DataProvider } from '../data';
@Injectable()
export class DbProvider {

  constructor(private storage: Storage, private data: DataProvider) {
    console.log('Hello DbProvider Provider');
  }

  public setFallbacks(): void {
    let flights = this.data.getFlights(true);
    let appversion = this.data.getAppVersion(true);
    let dbversion = this.data.getDbVersion(true);
    let donts = this.data.getDonts(true);
    let dos = this.data.getDos(true);
    let hotels = this.data.getHotels(true);
    let links = this.data.getLinks(true);
    let places = this.data.getPlaces(true);
    let translations = this.data.getTranslations(true);

    this.storage.ready().then(() => {
      this.storage.set("BUflights", flights);
      this.storage.set("BUappversion", appversion);
      this.storage.set("BUdbversion", dbversion);
      this.storage.set("BUdonts", donts);
      this.storage.set("BUdos", dos);
      this.storage.set("BUhotels", hotels);
      this.storage.set("BUlinks", links);
      this.storage.set("BUplaces", places);
      this.storage.set("BUtranslations", translations);
    });
  }
  public setLatest(): void {
    let flights = this.data.getFlights(false);
    let appversion = this.data.getAppVersion(false);
    let dbversion = this.data.getDbVersion(false);
    let donts = this.data.getDonts(false);
    let dos = this.data.getDos(false);
    let hotels = this.data.getHotels(false);
    let links = this.data.getLinks(false);
    let places = this.data.getPlaces(false);
    let translations = this.data.getTranslations(false);

    this.storage.ready().then(() => {
      this.storage.set("flights", flights);
      this.storage.set("appversion", appversion);
      this.storage.set("dbversion", dbversion);
      this.storage.set("donts", donts);
      this.storage.set("dos", dos);
      this.storage.set("hotels", hotels);
      this.storage.set("links", links);
      this.storage.set("places", places);
      this.storage.set("translations", translations);
    });
  }
  public printFallbacks(): void {
    this.storage.ready().then(() => {
      let flights = this.storage.get("BUflights");
      let app = this.storage.get("BUappversion");
      let db = this.storage.get("BUdbversion");
      let donts = this.storage.get("BUdonts");
      let dos = this.storage.get("BUdos");
      let hotels = this.storage.get("BUhotels");
      let links = this.storage.get("BUlinks");
      let places = this.storage.get("BUplaces");
      let trans = this.storage.get("BUtranslations");
      console.log("flights", flights);
      console.log("app", app);
      console.log("db", db);
      console.log("donts", donts);
      console.log("dos",dos);
      console.log("hotels",hotels);
    })
  }
  public printLatest(): void {

  }
}
