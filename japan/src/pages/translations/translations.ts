import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import Word from '../../models/word';
import { LocalsProvider } from '../../providers/locals';

@Component({
  selector: 'page-translations',
  templateUrl: 'translations.html',
})
export class TranslationsPage {
  words: Word[];
  foods: Word[];
  phrases: Word[];
  numbers: Word[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public locals: LocalsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslationsPage');
    this.locals.getTranslations().subscribe(response => {
      this.words = response;

      this.foods = this.words.filter((word) =>
        word.category == 'food');

      this.phrases = this.words.filter((word) =>
        word.category == 'phrases');

      this.numbers = this.words.filter((word) =>
        word.category == "number");

    }, err => {
      console.log(err);
    });
  }

}
