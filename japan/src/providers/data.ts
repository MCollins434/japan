import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataProvider {
  private _data: string = "./assets/data/";
  private ssKey: string = "1fbKWSvOYdtFQBX_EuRiUvvfswLxBvnpvJrsZom9_KVo";

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello Locals Provider');
  }
  
  getHotels(): Promise<any>  {
    return this._GET("hotels");
  }
  getTranslations(): Promise<any>  {
    return this._GET("translation");
  }
  getDos(): Promise<any>  {
    return this._GET("dos");   
  }
  getDonts(): Promise<any>  {
    return this._GET("donts");
  }
  getPlaces(): Promise<any>  {
    return this._GET("places");
  }
  getLinks(): Promise<any> {
    return this._GET("links");
  }
  getFlights(): Promise<any>  {
    return this._GET("flights");
  }
  getDocs(): Promise<any> {
    return this._GET("docs");
  }
  getDbVersion(): Promise<any>  {
    return this._GET("dbversion");
  }
  getAppVersion(): Promise<any>  {
    return this._getJson("appversion");
  }

  _GET(file: string): Promise<any>  {
    let bu = "BU"+file;
    let latest = this.storage.get(file);
    if(latest){
      return latest;
    }
    else {
      return this.storage.get(bu);
    }
  }

  _getJson(file: string): Promise<any>  {
    return new Promise(resolve => {
      this.http.get(this._data + file + ".json")
      .map((response) => response.json())
      .subscribe((data) => {
        resolve(data);
      })
    })
  }

  _getFromGoogle(sheetNum: number): Promise<any> {
    let url = 'https://spreadsheets.google.com/feeds/list/' + this.ssKey
      + '/' + sheetNum + '/public/values?alt=json';
    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Raw Data', data);
          let tmp = data.feed.entry;
          let returnArray: Array<any> = [];

          if (tmp && tmp.length > 0) {
            tmp.forEach((entry, index) => {
              var obj = {};
              for (let x in entry) {
                if (x.includes('gsx$') && entry[x].$t) {
                  obj[x.split('$')[1]] = entry[x]['$t'];
                  console.log(x.split('$')[1] + ': ' + entry[x]['$t']);
                }
              }
              returnArray.push(obj);
            });
          }
          resolve(returnArray);
        });
    });
  }

  public setFallbacks(): void {
    let flights = this._getJson("flights");
    let appversion = this._getJson("appversion");
    let dbversion = this._getJson("dbversion");
    let donts = this._getJson("donts");
    let dos = this._getJson("dos");
    let hotels = this._getJson("hotels");
    let links = this._getJson("links");
    let places = this._getJson("places");
    let translations = this._getJson("translation");

    this.storage.ready().then(() => {
      this.storage.set("BUflights", flights);
      this.storage.set("appversion", appversion);
      this.storage.set("BUdbversion", dbversion);
      this.storage.set("BUdonts", donts);
      this.storage.set("BUdos", dos);
      this.storage.set("BUhotels", hotels);
      this.storage.set("BUlinks", links);
      this.storage.set("BUplaces", places);
      this.storage.set("BUtranslations", translations);
    });
  }
  public setLatest(): Promise<any> {
    let flights = this._getFromGoogle(7);
    let dbversion = this._getFromGoogle(9);
    let donts = this._getFromGoogle(4);
    let dos = this._getFromGoogle(3);
    let hotels = this._getFromGoogle(1);
    let links = this._getFromGoogle(6);
    let places = this._getFromGoogle(5);
    let translations = this._getFromGoogle(2);

    return this.storage.ready().then(() => {
      this.storage.set("flights", flights);
      this.storage.set("dbversion", dbversion);
      this.storage.set("donts", donts);
      this.storage.set("dos", dos);
      this.storage.set("hotels", hotels);
      this.storage.set("links", links);
      this.storage.set("places", places);
      this.storage.set("translations", translations);
    });
  }
}
