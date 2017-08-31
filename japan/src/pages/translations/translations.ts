import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import Word from '../../models/word';
import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-translations',
  templateUrl: 'translations.html',
})
export class TranslationsPage {
  words: Word[];
  foodWords: Word[];
  phraseWords: Word[];
  numberWords: Word[];
  otherWords: Word[];
  food: string = "food";
  phrase: string = "phrase";
  number: string = "number";
  s: string = "S".toUpperCase();
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslationsPage');
    this.refresh();
  }

  _filterList(words: Word[]) {
    this.foodWords = words.filter((word) =>
      word.category.toUpperCase() == this.food.toUpperCase() ||
      word.category.toUpperCase() == this.food.toUpperCase() + this.s
    );

    this.phraseWords = words.filter((word) =>
      word.category.toUpperCase() == this.phrase.toUpperCase() ||
      word.category.toUpperCase() == this.phrase.toUpperCase() + this.s
    );

    this.numberWords = words.filter((word) =>
      word.category.toUpperCase() == this.number.toUpperCase() ||
      word.category.toUpperCase() == this.number.toUpperCase() + this.s
    );

    this.otherWords = words.filter((word) => {
      word.category.toUpperCase() != this.food.toUpperCase()
        && word.category.toUpperCase() != this.food.toUpperCase() + this.s
        && word.category.toUpperCase() != this.phrase.toUpperCase()
        && word.category.toUpperCase() != this.phrase.toUpperCase() + this.s
        && word.category.toUpperCase() != this.number.toUpperCase()
        && word.category.toUpperCase() != this.number.toUpperCase() + this.s
    });
  }
  
  refresh() {
    this.data.getTranslations().then((response) => {
      this.words = response;
      this._filterList(this.words);
    }, (err) => { console.log(err); });
  }

  getItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() != "") {
      this.data.getTranslations().then((response) => {
        this.words = response.filter((word) => {
          return (word.english.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
        this._filterList(this.words);
      });
    }
    else {
      this.refresh();
    }
  }
}
