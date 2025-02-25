import { Component, inject, OnInit } from '@angular/core';
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
import { UserGlobalService } from '../../Service/user-global.service';
import { ExpensesService } from '../../Service/expenses.service';

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
  providers: [ExpensesService],
})
export class ReportExpenseComponent implements OnInit {
  registerForm!: FormGroup;
  expenses!: any[];
  chooseMonth: ReportMonth[] = [];
  userId!: number;
  service = inject(ExpensesService);

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  constructor(
    private fb: FormBuilder,
    private serviceUserGlobal: UserGlobalService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedUser) => {
      this.userId = updatedUser.usuarioId;
    });

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

    this.expenses = [
      {
        titulo: 'Aluguel',
        valor: 1000,
        descricao: 'Meu aluguel',
        categoria: 'Essencial',
      },
    ];

    this.getExpensesUser();
  }

  getExpensesUser() {
    try {
      this.service.getListExpensesUser(this.userId).subscribe({
        next: (value) => {
          this.expenses = value.map((expense: any) => ({
            id: expense.id,
            titulo: expense.titulo,
            descricao: expense.descricao,
            categoria: expense.categoria,
            produto: expense.produto,
            valor: expense.valor,
            dataGasto: expense.dataGasto,
          }));
        },
        error: (err) => {
          console.error('Erro para carregar os dados ', err.error);
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  formatValueCurrencyBR(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  onMonth() {}
}
