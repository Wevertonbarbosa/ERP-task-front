import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { InputGlobalComponent } from '../../Components/input-global/input-global.component';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    FormsModule,
    CommonModule,
    PasswordModule,
    ButtonModule,
    InputGlobalComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  onSubmit() {
    console.log('Login attempt:', this.email, this.senha);
  }
}
