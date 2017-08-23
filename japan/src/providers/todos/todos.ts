import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Todo, TodoDetails } from '../../models/todo';

/*
  Generated class for the TodosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TodosProvider {
  todos: Todo[] = [];

  constructor(public http: Http) {
    console.log('Hello TodosProvider Provider');
    let todos = [
      {
        "name": "Flight DCA to ORD",
        "day": "4",
        "time": "8:30",
        "details": new TodoDetails("Flight AA11130")
      }
    ];

    for(let todo of todos) {
      this.todos.push(new Todo(todo));
    }
  }
  query(params?: any) {
    if (!params) {
      return this.todos;
    }

    return this.todos.filter((todo) => {
      for (let key in params) {
        let field = todo[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return todo;
        } else if (field == params[key]) {
          return todo;
        }
      }
      return null;
    });
  }
}
