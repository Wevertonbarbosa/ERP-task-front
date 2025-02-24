import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { ExpensesService } from '../../../../Service/expenses.service';
import { UserGlobalService } from '../../../../Service/user-global.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finance',
  imports: [
    ChartModule,
    CardModule,
    CommonModule,
    TableModule,
    ButtonModule,
    TabsModule,
  ],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css',
  providers: [ExpensesService],
})
export class FinanceComponent implements OnInit {
  listExpense: any[] = [];
  chartData: any;
  chartOptions: any;
  userId!: number;
  valueTotalCategory: any[] = [];

  loading: boolean = false;

  listEssentialExpenses: any[] = [];
  listEssentialExpensesNo: any[] = [];

  valueExpenseTotal = 0;

  constructor(
    private service: ExpensesService,
    private serviceUserGlobal: UserGlobalService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedUser) => {
      this.userId = updatedUser.usuarioId;
    });

    this.getUserExpenseList();
    this.getTotalExpensesUser();
    this.getCategoryListTotal();

    this.chartOptions = {
      responsive: true,
      indexAxis: 'x',
      aspectRatio: 0.8,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          align: 'center',
          display: true,
          position: 'top',
          labels: {
            pointStyle: 'circle',
            padding: 7,
            usePointStyle: true,
            font: {
              size: 13,
              weight: 'bolder',
            },
          },
        },
      },
    };
  }

  getUserExpenseList() {
    try {
      this.service.getListExpensesUser(this.userId).subscribe({
        next: (value) => {
          this.listEssentialExpenses = value.filter(
            (expense: any) => expense.categoria === 'ESSENCIAL'
          );

          this.listEssentialExpensesNo = value.filter(
            (expense: any) => expense.categoria === 'NAO_ESSENCIAL'
          );
        },
        error: (err) => {
          console.error(
            'Erro para carregar os dados de gastos total ',
            err.error
          );
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  formatDate(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  getTotalExpensesUser() {
    try {
      this.service.getExpensesTotal(this.userId).subscribe({
        next: (value) => {
          this.valueExpenseTotal = value;
        },
        error: (err) => {
          console.error(
            'Erro para carregar os dados de gastos total ',
            err.error
          );
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  reloadTableData() {
    this.loading = true;

    setTimeout(() => {
      this.getUserExpenseList();
      this.loading = false;
    }, 3000);
  }

  formatValueCurrencyBR(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  getCategoryListTotal() {
    try {
      this.service.getListMonthCategoryTotalExpense(this.userId).subscribe({
        next: (value) => {
          if (!value) {
            this.setDefaultChartData();
            return;
          }

          // Criando um array com os meses desejados (Janeiro a Junho)
          const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
          const dadosEssenciais = new Array(6).fill(0); // Inicializa com 0
          const dadosNaoEssenciais = new Array(6).fill(0); // Inicializa com 0

          // Percorre os valores retornados pela API e os posiciona corretamente
          value.forEach((total: any) => {
            const mes = parseInt(total.mesAno.split('-')[1]); // Extrai o número do mês (ex: "2025-02" -> 2)
            if (mes >= 1 && mes <= 6) {
              // Considera apenas de Jan (1) a Jun (6)
              const index = mes - 1; // Ajusta para a posição correta no array (0 a 5)
              dadosEssenciais[index] = total.totalEssencial;
              dadosNaoEssenciais[index] = total.totalNaoEssencial;
            }
          });

          this.chartData = {
            labels: meses, // Apenas Jan até Jun
            datasets: [
              {
                label: 'Gastos essenciais',
                data: dadosEssenciais,
                backgroundColor: ['blue'],
                hoverBackgroundColor: ['darkblue'],
              },
              {
                label: 'Gastos não essenciais',
                data: dadosNaoEssenciais,
                backgroundColor: ['gray'],
                hoverBackgroundColor: ['darkgray'],
              },
            ],
          };
        },
        error: (err) => {
          console.error(
            'Erro para carregar os dados de total categoria ',
            err.error
          );

          this.setDefaultChartData();
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  setDefaultChartData() {
    const firstSixMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

    this.chartData = {
      labels: firstSixMonths, // Apenas Janeiro a Junho
      datasets: [
        {
          label: 'Gastos essenciais',
          data: new Array(6).fill(0), // Preenche 6 meses com 0
          backgroundColor: ['blue'],
          hoverBackgroundColor: ['darkblue'],
        },
        {
          label: 'Gastos não essenciais',
          data: new Array(6).fill(0),
          backgroundColor: ['gray'],
          hoverBackgroundColor: ['darkgray'],
        },
      ],
    };
  }
}
