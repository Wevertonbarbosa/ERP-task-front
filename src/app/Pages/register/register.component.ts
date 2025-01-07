import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputGlobalComponent } from '../../Components/input-global/input-global.component';
import { InputPasswordGlobalComponent } from '../../Components/input-password-global/input-password-global.component';
import { SelectModule } from 'primeng/select';
import { User } from '../../Interface/User';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    SelectModule,
    Select,
    InputGlobalComponent,
    InputPasswordGlobalComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  senha: string = '';

  typeUser: User[] = [];
  selectedUser!: User | undefined;

  ngOnInit() {
    this.typeUser = [
      { role: 'ADMIN', disabled: false },
      { role: 'USER', disabled: true },
    ];

    this.selectedUser = this.typeUser[0];
  }

  onRegister() {
    console.log('User Registration Details:', {
      name: this.name,
      email: this.email,
      password: this.senha,
    });
  }
}
