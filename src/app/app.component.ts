import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Task } from './shared/task-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  apiUrl = '../assets/res.json';
  todos: Task[] = [];
  filteredTodos: Task[] = [];
  a: any = [];
  notFound = false;
  loading: boolean;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getTodos();
  }
  doSearch(term: string) {
    this.filteredTodos = this.todos.filter((todo) => {
      if (
        todo.description.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      ) {
        return todo;
      }
    });
    this.filteredTodos.length === 0
      ? (this.notFound = true)
      : (this.notFound = false);
  }

  getTodos(): Task[] {
    this.loading = true;
    let promisse = new Promise((resolve, rejects) => {
      setTimeout(() => {
        let result = this.http
          .get(this.apiUrl)
          .toPromise()
          .then((res) => {
            this.a = res;
            this.a.map((element) => {
              if (element.assigned_to.length == 1) {
                element.assigned_to.map((el) => {
                  element.assigned_to_name = el.person_name;
                  element.assigned_to_status = el.status;
                });
              }
              if (element.assigned_to.length < 1) {
                element.assigned_to_name = 'No data available';
                element.assigned_to_status = 'No data available';
              }
              if (element.assigned_to.length == 2) {
                element.assigned_to.reduce((prevEl, currEl) => {
                  const assigned = {
                    person_name: `${prevEl.person_name} , ${currEl.person_name}`,
                    status: `${prevEl.status} , ${currEl.status}`,
                  };
                  element.assigned_to.map(() => {
                    element.assigned_to_name = assigned.person_name;
                    element.assigned_to_status = assigned.status;
                  });
                });
              }
            });
            this.todos = this.a;
            this.filteredTodos = this.a;
            return this.todos;
          });

        this.loading = false;
        resolve(result);
      }, 110);
    });
    return this.filteredTodos;
  }
}
