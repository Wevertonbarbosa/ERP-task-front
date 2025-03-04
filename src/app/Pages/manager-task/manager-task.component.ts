import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ReportTaskGlobalComponent } from './components/report-task-global/report-task-global.component';
import { ReportTaskMonthComponent } from './components/report-task-month/report-task-month.component';

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
    ReportTaskGlobalComponent,
    ReportTaskMonthComponent,
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
  registerForm!: FormGroup;
  loading: boolean = false;

  dateStartSelected!: string;
  dateEndSelected!: string;

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  @ViewChild(ReportTaskGlobalComponent)
  reportExpenseComponent!: ReportTaskGlobalComponent;

  @ViewChild(ReportTaskMonthComponent)
  reportTaskMonthComponent!: ReportTaskMonthComponent;

  constructor(
    private service: TaskService,
    private serviceUserGlobal: UserGlobalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedUser) => {
      this.userId = updatedUser.usuarioId;
    });

    this.registerForm = this.fb.group({
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
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
    if (!date) return ''; 

    const [year, month, day] = date.split('-');

    return `${day}-${month}-${year}`;
  }

  downloadGlobalPDF() {
    this.reportExpenseComponent.showDialog();
  }

  onReportTaskMonth() {
    const formData = { ...this.registerForm.value };
    formData.dataInicio = this.formatDateForReport(formData.dataInicio);
    formData.dataFim = this.formatDateForReport(formData.dataFim);

    this.dateStartSelected = formData.dataInicio;
    this.dateEndSelected = formData.dataFim;

    this.reportTaskMonthComponent.getTaskUser();
    this.reportTaskMonthComponent.showDialog();

    this.registerForm.reset();
  }

  formatDateForReport(date: Date): string {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${month}-${year}`;
  }
}
