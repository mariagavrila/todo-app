import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  doneTodos: Todo[] = [];
  incompleteTodos: Todo[] = [];
  todo: Todo = { _id: '', title: '', status: 'Incomplete' };
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getIncompleteTodos();
    this.getDoneTodos();
  }

  getIncompleteTodos(): void {
    this.todoService.getIncompleteTodos().subscribe((todos) => {
      this.incompleteTodos = todos;
    });
  }

  getDoneTodos(): void {
    this.todoService.getDoneTodos().subscribe((todos) => {
      this.doneTodos = todos;
    });
  }

  createTodo(): void {
    if (this.todo.title === '') return;

    if (this.todo._id !== '') {
      this.updateTodo(this.todo);
    } else {
      this.todoService.createTodo(this.todo.title).subscribe(() => {
        this.todo.title = '';
        this.todo._id = '';

        this.getDoneTodos();
        this.getIncompleteTodos();
      });
    }
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo._id, todo).subscribe(() => {
      this.todo = { _id: '', title: '', status: 'Incomplete' };
      this.getDoneTodos();
      this.getIncompleteTodos();
    });
  }

  doneTodo(todo: Todo): void{
    this.updateTodo({...todo, status:'Done'})
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.getDoneTodos();
      this.getIncompleteTodos();
    });
  }

  setTodo({_id, title, status}: Todo): void {
    this.todo = {_id, title, status};
  }
  //test1
}
