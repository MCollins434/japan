import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tododetails',
  templateUrl: 'tododetails.html',
})
export class TodoDetailsPage {
  todo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.todo = navParams.get('todo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TododetailsPage');
  }

}
