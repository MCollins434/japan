import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import Word from '../../models/word';
import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-translations',
  templateUrl: 'translations.html',
})
export class TranslationsPage {
  categories: WordCategory[] = [];
  words: Word[];
  food: string = "food";
  phrase: string = "phrase";
  number: string = "number";
  s: string = "S".toUpperCase();
  searchQuery: string = '';
  showLevel1 = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public data: DataProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslationsPage');
    this.refresh();
  }

  _filterList(words: Word[]) {
    let foodWords = words.filter((word) =>
      word.category.toUpperCase() == this.food.toUpperCase() ||
      word.category.toUpperCase() == this.food.toUpperCase() + this.s
    );

    let phraseWords = words.filter((word) =>
      word.category.toUpperCase() == this.phrase.toUpperCase() ||
      word.category.toUpperCase() == this.phrase.toUpperCase() + this.s
    );

    let numberWords = words.filter((word) =>
      word.category.toUpperCase() == this.number.toUpperCase() ||
      word.category.toUpperCase() == this.number.toUpperCase() + this.s
    );

    let otherWords = words.filter((word) => {
      word.category.toUpperCase() != this.food.toUpperCase()
        && word.category.toUpperCase() != this.food.toUpperCase() + this.s
        && word.category.toUpperCase() != this.phrase.toUpperCase()
        && word.category.toUpperCase() != this.phrase.toUpperCase() + this.s
        && word.category.toUpperCase() != this.number.toUpperCase()
        && word.category.toUpperCase() != this.number.toUpperCase() + this.s
    });

    let foods: WordCategory = { category: "Foods", words: foodWords };
    let phrases: WordCategory = { category: "Phrases", words: phraseWords };
    let numbers: WordCategory = { category: "Numbers", words: numberWords };
    let others: WordCategory = { category: "Others", words: otherWords };

    this.categories.push(phrases);
    this.categories.push(foods);
    this.categories.push(numbers);
    this.categories.push(others);
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

  showChars(word: Word) {
    let alert = this.alertCtrl.create({
      title: word.jchars,
      subTitle: word.japanese,
      buttons: ['OK']
    });
    alert.present();
  }

  toggleLevel1(idx) {
    if(this.isLevel1Shown(idx)) {
      this.showLevel1 = null; 
    } else {
      this.showLevel1 = idx;
    }
  }

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  }
}

export class WordCategory {
  category: string;
  words: Word[];
}
