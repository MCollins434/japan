import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TranslationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-translations',
  templateUrl: 'translations.html',
})
export class TranslationsPage {
  words: Array<{english: string, japanese: string, pronc: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.words = [];
    this.words.push({
      english: 'Thank You',
      japanese: 'Arigato',
      pronc: ''
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslationsPage');
  }

}
