import { Component, Input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { Select } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputGlobalComponent } from '../../../../Components/input-global/input-global.component';
import { ToastGlobalComponent } from '../../../../Components/toast-global/toast-global.component';
import { Frequence } from '../../../../Interface/frequence';
import { UserGlobalService } from '../../../../Service/user-global.service';
import { TaskService } from '../../../../Service/task.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-task',
  imports: [
    DialogModule,
    ButtonModule,
    Select,
    FloatLabel,
    TextareaModule,
    DatePickerModule,
    ReactiveFormsModule,
    SelectModule,
    CommonModule,
    FormsModule,
    InputGlobalComponent,
    ToastGlobalComponent,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  providers: [TaskService, MessageService],
})
export class AddTaskComponent implements OnInit {
  @Input() visible!: boolean;

  registerForm!: FormGroup;
  loading: boolean = false;
  keyToast: string = 'br';
  frequence: Frequence[] = [];
  userId!: number;

  dateStart: Date | undefined;

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  constructor(
    private fb: FormBuilder,
    private service: TaskService,
    private messageService: MessageService,
    private serviceUserGlobal: UserGlobalService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((taskUser) => {
      this.userId = taskUser.usuarioId;
    });

    this.dateStart = new Date();
    this.dateStart.getDate();

    this.frequence = [
      { choose: 'DIARIA' },
      { choose: 'SEMANAL' },
      { choose: 'MENSAL' },
      { choose: 'ESPORADICA' },
    ];

    this.registerForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(8)]],
      categoria: ['', [Validators.required, Validators.minLength(3)]],
      frequencia: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
      // PRECISO IR PENSANDO EM COMO VOU ENVIAR ESSE
      diasSemana: [[], []],
    });
  }

  onAddTask() {
    const formData = { ...this.registerForm.value };
    formData.frequencia = formData.frequencia.choose;
    formData.dataInicio = this.formatDate(formData.dataInicio);
    formData.dataFim = this.formatDate(formData.dataFim);

    try {
      this.loading = true;
      if (this.registerForm.valid) {
        this.service.postTask(this.userId, this.userId, formData).subscribe({
          next: (value) => {
            console.log(value);
            this.showToasRight(
              'success',
              'Tarefa cadastrada!',
              'Tarefa foi cadastrada com sucesso!'
            );
            this.registerForm.reset()
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro para registrar tarefa ', err.error);
            this.showToasRight(
              'error',
              'Erro ao cadastrar tarefa',
              err.error.nome == undefined
                ? 'Estamos ajustando voltamos em breve'
                : err.error.nome
            );
            this.loading = false;
          },
        });
      }
    } catch (error) {
      console.error('Error do Try Catch', error);
      this.loading = false;
    }
  }

  showToasRight(color: string, title: string, msg: string) {
    this.messageService.add({
      severity: color,
      summary: title,
      detail: msg,
      key: this.keyToast,
      life: 4000,
    });
  }

  formatDate(date: Date): string {
    if (!date) return ''; // Caso esteja vazio

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque Janeiro é 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  showDialog() {
    this.visible = true;
  }
}
