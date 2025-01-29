import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../Components/menu/menu.component';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReportMonth } from '../../Interface/reportMonth';

@Component({
  selector: 'app-report-expense',
  imports: [
    MenuComponent,
    DividerModule,
    CardModule,
    SelectModule,
    ButtonModule,
    OrderListModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './report-expense.component.html',
  styleUrl: './report-expense.component.css',
})
export class ReportExpenseComponent implements OnInit {
  registerForm!: FormGroup;
  products!: any[];
  chooseMonth: ReportMonth[] = [];

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.chooseMonth = [
      { mes: 'Janeiro' },
      { mes: 'Fevereiro' },
      { mes: 'Março' },
      { mes: 'Abril' },
      { mes: 'Maio' },
      { mes: 'Junho' },
      { mes: 'Julho' },
      { mes: 'Agosto' },
      { mes: 'Setembro' },
      { mes: 'Outubro' },
      { mes: 'Novembro' },
      { mes: 'Dezembro' },
    ];
    
    this.registerForm = this.fb.group({
      mes: ['', [Validators.required]],
    });

    this.products = [
      {
        titulo: 'Aluguel',
        valor: 1000,
        descricao: 'Meu aluguel',
        categoria: 'Essencial',
      },
    ];
  }



  onMonth(){}
}
