import { Component, inject, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';

import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { DrawerComponent } from '../drawer/drawer.component';
import { RouterModule } from '@angular/router';

import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-menu',
  imports: [
    MenubarModule,
    ChipModule,
    RouterModule,
    DrawerModule,
    ButtonModule,
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    CommonModule,
    DrawerComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
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
            url: '/dashboard',
          },
          {
            label: 'Tarefas do Dia',
          },
          {
            label: 'Cadastrar Tarefas',
          },
          {
            separator: true,
          },
        ],
      },
      {
        label: 'Financeiro',
        items: [
          {
            label: 'Calculadora de gastos',
            url: '/dashboard',
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
}
