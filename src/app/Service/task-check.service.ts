import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskCheckService {

  private readonly api = environment.API;
  constructor(private http: HttpClient) { }


   postSignalTask(idTask: number, idUser: number, data: any): Observable<any> {
      return this.http.post<any>(
        `${this.api}tarefas-data/${idTask}/sinalizar/${idUser}`,
        data
      );
    }

}
