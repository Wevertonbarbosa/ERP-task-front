import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { MenuComponent } from '../../Components/menu/menu.component';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { KnobModule } from 'primeng/knob';
import { FinanceComponent } from './components/finance/finance.component';
import { ListStatusTaskService } from '../../Service/list-status-task.service';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    MenuComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ChartModule,
    CardModule,
    AvatarModule,
    DividerModule,
    KnobModule,
    FinanceComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [ListStatusTaskService],
})
export class DashboardComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  taskDone!: string | number;
  taskMissing!: string | number;
  userName!: string;
  valueKnob!:string;

  constructor(private service: ListStatusTaskService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.nome || 'Usuário';

    try {
      this.service.getListTaskStatusUser(user.usuarioId).subscribe({
        next: (value) => {
          console.log('resposta api ', value);
          this.taskDone = value.tarefasConcluidas;
          this.taskMissing = value.tarefasPendentes;

          this.chartData = {
            labels: ['Concluídas', 'Pendentes'],
            datasets: [
              {
                data: [this.taskDone, this.taskMissing],
                backgroundColor: ['#4caf50', '#f44336'],
                hoverBackgroundColor: ['#66bb6a', '#e57373'],
              },
            ],
          };
        },
        error: () => {},
      });

      


    } catch (error) {
    } finally {
     
    }

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
