import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Todo, TodoDetails } from '../../models/todo';
import { TodoDetailsPage } from '../tododetails/tododetails';
import { TodosProvider } from '../../providers/todos/todos';

/**
 * Generated class for the IteneraryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-itenerary',
  templateUrl: 'itenerary.html',
})
export class IteneraryPage {
  currentTodos: Todo[];

  constructor(public navCtrl: NavController, public todos: TodosProvider, public navParams: NavParams) {
    this.currentTodos = this.todos.query();
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
