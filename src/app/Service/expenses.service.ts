import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private readonly api = environment.API;
  constructor(private http: HttpClient) {}


  //retorno de array de gasto do usuario
  getListExpensesUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.api}gasto/${userId}/gastos`);
  }

  //retorno do gasto total do usuario
  getExpensesTotal(userId: number): Observable<any> {
    return this.http.get<any>(`${this.api}gasto/${userId}/gastos/total`);
  }

  //retorna o gasto total por categoria total
  getResultTotalExpenseCategory(userId: number): Observable<any> {
    return this.http.get<any>(
      `${this.api}gasto/${userId}/gastos/total/categoria`
    );
  }

  //retorna o total de gasto por categorias agrupada com mes
  getListMonthCategoryTotalExpense(userId: number): Observable<any> {
    return this.http.get<any>(
      `${this.api}gasto/${userId}/gastos/categoria/mensal`
    );
  }

  postAddExpenses(idUser: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.api}gasto/${idUser}/registro`, data);
  }

  deleteExpense(idExpense: number): Observable<any> {
    return this.http.delete<any>(`${this.api}gasto/${idExpense}`);
  }
}
