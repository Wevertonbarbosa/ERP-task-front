import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-finance',
  imports: [CardModule, ChartModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css',
})
export class FinanceComponent implements OnInit {
  chartData: any;
  chartOptions: any;

  ngOnInit() {
    this.chartData = {
      // PRIMEIRO SEMESTRE
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
      datasets: [
        {
          label: 'Gastos essencias',
          data: [1605],
          backgroundColor: ['#649bd9'],
          hoverBackgroundColor: ['lightblue'],
        },
        {
          label: 'Gastos não essencias',
          data: [750.5],
          backgroundColor: ['gray'],
          hoverBackgroundColor: ['lightgray'],
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.9,
      plugins: {
        legend: {
          display: true,

          position: 'top',
          labels: {
            usePointStyle: true,
            boxWidth: 65,
            font: {
              size: 14,
              weight: 'bold',
            },
          },
        },
      },

      scales: {
        x: {
          ticks: {
            font: {
              weight: 700,
            },
          },
          grid: {
            drawBorder: false,
          },
        },
      },

      y: {
        grid: {
          drawBorder: false,
        },
      },
    };
  }
}
