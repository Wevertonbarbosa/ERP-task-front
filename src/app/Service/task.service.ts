import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly api = environment.API;
  constructor(private http: HttpClient) { }

  getTasks(id:number): Observable<any>{
    return this.http.get<any>(`${this.api}tarefas/${id}`)
  }

}
