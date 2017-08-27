import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Todo } from '../../models/todo';
import { TodoDetailsPage } from '../tododetails/tododetails';
import { LocalsProvider } from '../../providers/locals';

@Component({
  selector: 'page-itenerary',
  templateUrl: 'itenerary.html',
})
export class IteneraryPage {
  currentTodos: Todo[];

  constructor(public navCtrl: NavController, public locals: LocalsProvider, public navParams: NavParams) {
    // this.currentTodos = this.locals.query();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IteneraryPage');
  }

  openDetails(todo: Todo) {
    this.navCtrl.push(TodoDetailsPage, {
      todo: todo
    });
  }

}
