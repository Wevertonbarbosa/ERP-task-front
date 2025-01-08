import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputGlobalComponent } from '../../Components/input-global/input-global.component';
import { InputPasswordGlobalComponent } from '../../Components/input-password-global/input-password-global.component';

@Component({
  selector: 'app-redefinir',
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputGlobalComponent,
    InputPasswordGlobalComponent,
  ],
  templateUrl: './redefinir.component.html',
  styleUrl: './redefinir.component.css',
})
export class RedefinirComponent {
  email: string = '';
  senha: string = '';

  onSubmit() {
    console.log('E-mail:', this.email);
    console.log('Nova Senha:', this.senha);
    alert('Senha redefinida com sucesso!');
  }
}
