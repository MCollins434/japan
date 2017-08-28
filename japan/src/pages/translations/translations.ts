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

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslationsPage');
    this.data.getTranslations().then((response) => {
      this.words = response;
      this.foodWords = this.words.filter((word) =>
        word.category.toUpperCase() == this.food.toUpperCase() ||
        word.category.toUpperCase() == this.food.toUpperCase() + this.s
      );

      this.phraseWords = this.words.filter((word) =>
        word.category.toUpperCase() == this.phrase.toUpperCase() ||
        word.category.toUpperCase() == this.phrase.toUpperCase() + this.s
      );

      this.numberWords = this.words.filter((word) =>
        word.category.toUpperCase() == this.number.toUpperCase() ||
        word.category.toUpperCase() == this.number.toUpperCase() + this.s
      );

      this.otherWords = this.words.filter((word) => {
        word.category.toUpperCase() != this.food.toUpperCase()
        && word.category.toUpperCase() != this.food.toUpperCase() + this.s
        && word.category.toUpperCase() != this.phrase.toUpperCase()
        && word.category.toUpperCase() != this.phrase.toUpperCase()+ this.s
        && word.category.toUpperCase() != this.number.toUpperCase()
        && word.category.toUpperCase() != this.number.toUpperCase()+ this.s
      });
    }, (err) => { console.log(err); });
  }
}
