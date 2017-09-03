import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import ExRate from "../models/exrate";

@Injectable()
export class DataProvider {
  private _data: string = "./assets/data/";
  private ssKey: string = "1fbKWSvOYdtFQBX_EuRiUvvfswLxBvnpvJrsZom9_KVo";

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello Locals Provider');
  }

  getHotels(): any {
    return this._GET("hotels");
  }
  getTranslations(): any {
    return this._GET("translation");
  }
  getDos(): any {
    return this._GET("dos");
  }
  getDonts(): any {
    return this._GET("donts");
  }
  getPlaces(): any {
    return this._GET("places");
  }
  getLinks(): any {
    return this._GET("links");
  }
  getFlights(): any {
    return this._GET("flights");
  }
  getDocs(): any {
    return this._GET("docs");
  }
  getDbVersion(): any {
    return this._GET("dbversion").then((resp) => {
      return resp;
    });
  }
  getAppVersion(): any {
    return this._getJson("appversion").then((resp) => {
      return resp;
    });
  }

  getExRate(): any {
    return this._GET("exrate").then((resp) => {
      return resp;
    });
  }

  _GET(file: string): any {
    let bu = "BU" + file;

    // this.storage.ready().then(() => {
    return this.storage.get(file).then((value) => {
      if (value) {
        return JSON.parse(value);
      }
      else {
        return this.storage.get(bu).then((value) => {
          return JSON.parse(value);
        });
      }
    });
    // });
  }

  _getJson(file: string): Promise<any> {
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
    let baseExRate: ExRate;
    baseExRate = {rate: 110.15, date: "2017-08-30"}  
    this.storage.ready().then(() => {
      this.storage.set("BUexrate", JSON.stringify(baseExRate));
      this._getJson("hotels").then((resp) => {
        let hotels = resp;
        this.storage.set("BUhotels", JSON.stringify(hotels));
      });
      this._getJson("translation").then((resp) => {
        let translations = resp;
        this.storage.set("BUtranslation", JSON.stringify(translations));
      });
      this._getJson("dos").then((resp) => {
        let dos = resp;
        this.storage.set("BUdos", JSON.stringify(dos));
      });
      this._getJson("donts").then((resp) => {
        let donts = resp;
        this.storage.set("BUdonts", JSON.stringify(donts));
      });
      this._getJson("places").then((resp) => {
        let places = resp;
        this.storage.set("BUplaces", JSON.stringify(places));
      });
      this._getJson("links").then((resp) => {
        let links = resp;
        this.storage.set("BUlinks", JSON.stringify(links));
      });
      this._getJson("flights").then((resp) => {
        let flights = resp;
        this.storage.set("BUflights", JSON.stringify(flights));
      });
      this._getJson("dbversion").then((resp) => {
        let dbv = resp;
        this.storage.set("BUdbversion", JSON.stringify(dbv));
      });
    });
  }
  public setLatest(): void {

    this.storage.ready().then(() => {
      this._getFromGoogle(9).then((resp) => {
        let dbv = resp[0].version;
        this.storage.set("dbversion", JSON.stringify(dbv));
      });
      this._getFromGoogle(1).then((resp) => {
        let hotels = resp;
        this.storage.set("hotels", JSON.stringify(hotels));
      });
      this._getFromGoogle(2).then((resp) => {
        let translations = resp;
        this.storage.set("translation", JSON.stringify(translations));
      });
      this._getFromGoogle(3).then((resp) => {
        let dos = resp;
        this.storage.set("dos", JSON.stringify(dos));
      });
      this._getFromGoogle(4).then((resp) => {
        let donts = resp;
        this.storage.set("donts", JSON.stringify(donts));
      });
      this._getFromGoogle(5).then((resp) => {
        let places = resp;
        this.storage.set("places", JSON.stringify(places));
      });
      this._getFromGoogle(6).then((resp) => {
        let links = resp;
        this.storage.set("links", JSON.stringify(links));
      });
      this._getFromGoogle(7).then((resp) => {
        let flights = resp;
        this.storage.set("flights", JSON.stringify(flights));
      });
      this.getExchangeRate().then((resp) => {
        let exr: ExRate;
        exr = {rate: resp.rate as number , date: resp.date}
        this.storage.set("exrate", JSON.stringify(exr));
      });
    });
  }

  getExchangeRate(): Promise<any> {
    let url = "http://api.fixer.io/latest?base=USD";
    return new Promise(resolve => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Raw Data', data);
          let returnObj: {date: string, rate:string};
          returnObj = {date: data.date, rate: data.rates.JPY};
          resolve(returnObj);
        });
    });
  }
}
