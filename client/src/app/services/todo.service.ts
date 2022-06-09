import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseURL = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  getIncompleteTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseURL}/api/todos/Incomplete`);
  }

  getDoneTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseURL}/api/todos/Done`);
  }

  createTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseURL}/api/todos`, { title });
  }

  updateTodo(todoId: string, body: { title: string; status: string }): Observable<any>{
    return this.http.put(`${this.baseURL}/api/todos/${todoId}`, body);
  }

  deleteTodo(todoId: string): Observable<any>{
    return this.http.delete(`${this.baseURL}/api/todos/${todoId}`);
  }
}
