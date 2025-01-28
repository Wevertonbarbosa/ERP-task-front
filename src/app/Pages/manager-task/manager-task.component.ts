import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../Components/menu/menu.component';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-manager-task',
  imports: [
    MenuComponent,
    DatePickerModule,
    ButtonModule,
    DividerModule,
    CardModule,
    FloatLabel,
    Tag,
    OrderListModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './manager-task.component.html',
  styleUrl: './manager-task.component.css',
})
export class ManagerTaskComponent implements OnInit {
  products!: any[];
  startDate: any;
  endDate: any;

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
