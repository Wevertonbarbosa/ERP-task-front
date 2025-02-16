import { Component, OnInit } from '@angular/core';
import { InputGlobalComponent } from '../../../../Components/input-global/input-global.component';

import { ButtonModule } from 'primeng/button';
import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastGlobalComponent } from '../../../../Components/toast-global/toast-global.component';
import { LoginUserService } from '../../../../Service/login-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-mentee',
  imports: [
    InputGlobalComponent,
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastGlobalComponent,
  ],
  templateUrl: './login-mentee.component.html',
  styleUrl: './login-mentee.component.css',
  providers: [MessageService, LoginUserService],
})
export class LoginMenteeComponent implements OnInit {
  registerForm!: FormGroup;
  keyToast: string = 'br';
  loading: boolean = false;

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private service: LoginUserService,
    private route: Router
  ) {}
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onLoginMentee() {
    try {
      this.loading = true;
      if (this.registerForm.valid) {
        this.service.postLoginMentee(this.registerForm.value).subscribe({
          next: (value) => {
            localStorage.setItem('user', JSON.stringify(value));
            this.showToasRight(
              'success',
              'Usuário cadastrado!',
              `Que bom te ver por aqui, ${value.nome}!`
            );
            setTimeout(() => {
              this.loading = false;
              this.route.navigate(['dashboard']);
            }, 3000);
          },
          error: (err) => {
            console.error('Erro para login ', err.error);
            this.showToasRight(
              'error',
              'Erro ao fazer login',
              err.error == undefined
                ? 'Estamos ajustando voltamos em breve'
                : err.error
            );

            this.loading = false;
          },
        });
      }
    } catch (error) {
      console.error('Error do Try Catch', error);
      this.loading = false;
    }
  }

  showToasRight(color: string, title: string, msg: string) {
    this.messageService.add({
      severity: color,
      summary: title,
      detail: msg,
      key: this.keyToast,
      life: 4000,
    });
  }
}
