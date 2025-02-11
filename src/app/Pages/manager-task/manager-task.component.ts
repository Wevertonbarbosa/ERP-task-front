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
import { TaskService } from '../../Service/task.service';
import { UserGlobalService } from '../../Service/user-global.service';

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
  providers: [TaskService],
})
export class ManagerTaskComponent implements OnInit {
  products!: any[];
  startDate: any;
  endDate: any;
  userId!: number;

  constructor(
    private service: TaskService,
    private serviceUserGlobal: UserGlobalService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedUser) => {
      this.userId = updatedUser.usuarioId;
    });

    this.getTaskUser();
  }

  getTaskUser() {
    try {
      this.service.getTasks(this.userId).subscribe({
        next: (value) => {
          this.products = value.map((task: any) => ({
            id: task.id,
            responsavelId: task.responsavelId,
            status: task.status,
            titulo: task.titulo,
            descricao: task.descricao,
            categoria: task.categoria,
            frequencia: task.frequencia,
            dataInicio: this.formatDate(task.dataInicio),
            dataFim: this.formatDate(task.dataFim),
            diasSemana: task.diasSemana,
            checked: false,
            deleteTask: false,
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

  formatDate(date: string): string {
    if (!date) return ''; // Evita erro se a data for nula ou vazia

    const [year, month, day] = date.split('-'); // Divide manualmente

    return `${day}-${month}-${year}`;
  }
}
