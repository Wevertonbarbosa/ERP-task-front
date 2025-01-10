import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { MenuComponent } from '../../Components/menu/menu.component';

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent, ChartModule, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  ngOnInit() {
    // Dados do gráfico
    this.chartData = {
      labels: ['Concluídas', 'Pendentes', 'Em Andamento'],
      datasets: [
        {
          data: [8, 2, 2],
          backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
          hoverBackgroundColor: ['#66bb6a', '#e57373', '#ffb74d'],
        },
      ],
    };

    // Configurações do gráfico
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right',
        },
      },
    };
  }
}
