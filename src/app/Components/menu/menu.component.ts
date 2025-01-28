import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { DrawerComponent } from '../drawer/drawer.component';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { Select } from 'primeng/select';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { InputGlobalComponent } from '../input-global/input-global.component';
import { InputPasswordGlobalComponent } from '../input-password-global/input-password-global.component';
import { User } from '../../Interface/user';

@Component({
  selector: 'app-menu',
  imports: [
    MenubarModule,
    Select,
    ChipModule,
    RouterModule,
    SelectModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    DrawerModule,
    ButtonModule,
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    CommonModule,
    DrawerComponent,
    InputGlobalComponent,
    InputPasswordGlobalComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  visible: boolean = false;
  registerForm!: FormGroup;
  typeUser: User[] = [];
  loading: boolean = false;

  constructor(private fb: FormBuilder) {}

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  ngOnInit() {
    this.typeUser = [{ role: 'ADMIN' }, { role: 'USER', disabled: true }];

    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      role: [this.typeUser[0], Validators.required],
    });

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/dashboard',
      },
      {
        label: 'Tarefas',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Gestão de tarefas',
            url: '/gerenciar-tarefas',
          },
          {
            label: 'Tarefas do Dia',
            url: '/tarefas',
          },
        ],
      },
      {
        label: 'Financeiro',
        items: [
          {
            label: 'Gastos mensais',
            url: '/gastos',
          },
          {
            label: 'Registros de gastos',
            url: '/dashboard',
          },
          {
            label: 'Relatório de gastos',
            url: '/dashboard',
          },
        ],
      },
      {
        label: 'Mentoria',
        items: [
          {
            label: 'Mentorados',
            url: '/dashboard',
          },
          {
            label: 'Desempenho mentorado',
            url: '/dashboard',
          },
          {
            label: 'Cadastro de tarefas mentorados ',
            url: '/dashboard',
          },
          {
            label: 'Tarefas do mentorado',
            url: '/dashboard',
          },
        ],
      },
    ];
  }

  onUpdateUser() {}
}
