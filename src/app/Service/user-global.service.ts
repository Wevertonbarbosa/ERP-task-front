import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGlobalService {
  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  user$ = this.userSubject.asObservable(); // Observável para escutar mudanças

  constructor() {}

  private getUserFromStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  updateUser(newUser: any) {
    localStorage.setItem('user', JSON.stringify(newUser)); // Atualiza o localStorage
    this.userSubject.next(newUser); // Notifica os componentes da mudança
  }
}
