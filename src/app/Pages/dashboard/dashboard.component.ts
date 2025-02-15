import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { MenuComponent } from '../../Components/menu/menu.component';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { KnobModule } from 'primeng/knob';
import { FinanceComponent } from './components/finance/finance.component';
import { ListStatusTaskService } from '../../Service/list-status-task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserGlobalService } from '../../Service/user-global.service';

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
  taskDone: number = 0;
  taskMissing: number = 0;
  taskPerformance: number = 0;
  userName!: string;
  valueKnob!: string;

  userId!: number;

  constructor(
    private service: ListStatusTaskService,
    private serviceUserGlobal: UserGlobalService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedUser) => {
      this.userName = updatedUser.nome;
      this.userId = updatedUser.usuarioId;
    });

    try {
      this.service.getListTaskStatusUser(this.userId).subscribe({
        next: (value) => {
          console.log(value);

          this.taskDone = value.tarefasConcluidas;
          this.taskMissing = value.tarefasPendentes;

          const totalTasks = this.taskDone + this.taskMissing;
          this.taskPerformance =
            totalTasks > 0 ? (this.taskDone / totalTasks) * 100 : 0;

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
        error: (err) => {
          console.error('Erro para login ', err.error);
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
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
