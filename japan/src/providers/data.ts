import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
  private _data: string = "./assets/data/";
  private ssKey: string = "1fbKWSvOYdtFQBX_EuRiUvvfswLxBvnpvJrsZom9_KVo";
  private online: boolean = false;

  constructor(public http: Http) {
    console.log('Hello Locals Provider');
  }
  
  getHotels(local?: boolean): Promise<any>  {
    return this._GET("hotels", 1, local);
  }
  getTranslations(local?: boolean): Promise<any>  {
    return this._GET("translation", 2, local);
  }
  getDos(local?: boolean): Promise<any>  {
    return this._GET("dos", 3, local);   
  }
  getDonts(local?: boolean): Promise<any>  {
    return this._GET("donts", 4, local);
  }
  getPlaces(local?: boolean): Promise<any>  {
    return this._GET("places", 5, local);
  }
  getLinks(local?: boolean): Promise<any> {
    return this._GET("links", 6, local);
  }
  getFlights(local?: boolean): Promise<any>  {
    return this._GET("flights", 7, local);
  }
  getDocs(local?: boolean): Promise<any> {
    return this._GET("docs", 8, local);
  }
  getDbVersion(local?: boolean): Promise<any>  {
    return this._GET("dbversion", 9, local);
  }
  getAppVersion(local?: boolean): Promise<any>  {
    return this._getJson("appversion");
  }

  _GET(file: string, sheetNum: number, local?: boolean): Promise<any>  {
    if(local) {
      return this._getJson(file);
    }
    else {
      return this._getFromGoogle(sheetNum);
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
}
