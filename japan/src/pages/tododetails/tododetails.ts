import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TodosProvider } from '../../providers/todos/todos';

@Component({
  selector: 'page-tododetails',
  templateUrl: 'tododetails.html',
})
export class TodoDetailsPage {
  todo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, todos: TodosProvider) {
    this.todo = navParams.get('todo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TododetailsPage');
  }

}
