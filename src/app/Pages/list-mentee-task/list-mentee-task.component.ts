import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MenuComponent } from '../../Components/menu/menu.component';
import { OrderListModule } from 'primeng/orderlist';
import { SelectModule } from 'primeng/select';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-list-mentee-task',
  imports: [
    MenuComponent,
    CardModule,
    OrderListModule,
    Tag,
    CommonModule,
    SelectModule,
    Select,
  ],
  templateUrl: './list-mentee-task.component.html',
  styleUrl: './list-mentee-task.component.css',
})
export class ListMenteeTaskComponent implements OnInit {
  products!: any[];

  constructor() {}

  ngOnInit() {
    this.products = [
      {
        titulo: 'Tomar Banho',
        descricao: 'Tomar banho nesse lindo dia',
        categoria: 'Fazeres',
        frequencia: 'SEMANAL',
        dataInicio: '02/02/2025',
        dataFim: '10/02/2025',
        diasSemana: '13208',
      },
      {
        titulo: 'Segundo titulo',
        descricao: 'Comprar comida',
        categoria: 'Comida',
        frequencia: 'DIARIO',
        dataInicio: '02/02/2025',
        dataFim: '13/02/2025',
        diasSemana: '13208',
      },
    ];
  }
}
