import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RefreshProvider {
  private _data: string = "./assets/data/";

  constructor(public http: Http) {
    console.log('Hello RefreshProvider');
  }

  _updateJson(file: string) {
    return this.http.get(this._data + file)
    .map((response) => response.json());
  }
}
