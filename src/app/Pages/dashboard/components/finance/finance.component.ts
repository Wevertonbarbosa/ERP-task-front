import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-finance',
  imports: [ChartModule, CardModule, TableModule, ButtonModule, TabsModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css',
})
export class FinanceComponent implements OnInit {
  products!: any[];
  chartData: any;
  chartOptions: any;

  ngOnInit() {
    this.products = [
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
    ];

    this.chartData = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Gastos essenciais',
          data: [2500],
          backgroundColor: ['blue'],
          hoverBackgroundColor: ['darkblue'],
        },
        {
          label: 'Gastos não essenciais',
          data: [500],
          backgroundColor: ['gray'],
          hoverBackgroundColor: ['darkgray'],
        },
      ],
    };

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
              weight: 'bolder'
            },
          },
        },
      },
    };
  }
}
