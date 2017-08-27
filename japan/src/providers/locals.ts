import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalsProvider {
  private _data: string = "./assets/data/";

  constructor(public http: Http) {
    console.log('Hello Locals Provider');
  }

  getHotels() {
      return this._getJson("hotels");
  }

  getTranslations() {
    return this._getJson("translation")
  }

  getDos() {
    return this._getJson("dos");
  }

  getDonts() {
    return this._getJson("donts");
  }

  getPlaces() {
    return this._getJson("places");
  }

  getFlights() {
    return this._getJson("flights");
  }

  getAppVersion() {
    return this._getJson("appversion");
  }

  getDbVersion() {
    return this._getJson("dbversion");
  }

  _getJson(file: string) {
    return this.http.get(this._data + file + ".json")
    .map((response) => response.json());
  }
}
