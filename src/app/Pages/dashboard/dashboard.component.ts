import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { MenuComponent } from '../../Components/menu/menu.component';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { KnobModule } from 'primeng/knob';
import { FinanceComponent } from "./components/finance/finance.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    MenuComponent,
    ChartModule,
    CardModule,
    AvatarModule,
    DividerModule,
    KnobModule,
    FinanceComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  ngOnInit() {
    
    this.chartData = {
      labels: ['Concluídas', 'Pendentes'],
      datasets: [
        {
          data: [8, 2],
          backgroundColor: ['#4caf50', '#f44336'],
          hoverBackgroundColor: ['#66bb6a', '#e57373'],
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
