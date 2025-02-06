import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaskService } from '../../../../Service/task.service';
import { UserGlobalService } from '../../../../Service/user-global.service';

@Component({
  selector: 'app-update-task',
  imports: [
    DialogModule,
    ButtonModule,
    Select,
    FloatLabel,
    TextareaModule,
    ToastModule,
    DatePickerModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    SelectModule,
    CommonModule,
    FormsModule,
    InputGlobalComponent,
    ToastGlobalComponent,
  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css',
  providers: [ConfirmationService, MessageService, TaskService],
})
export class UpdateTaskComponent implements OnInit {
  @Input() visible!: boolean;
  @Output() refreshList = new EventEmitter<void>();

  registerForm!: FormGroup;
  loading: boolean = false;
  keyToast: string = 'br';
  frequence: Frequence[] = [];
  idUser!: number;

  taskUpdate!: any;

  dateStart: Date | undefined;

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private service: TaskService,
    private serviceUserGlobal: UserGlobalService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedTask) => {
      this.idUser = updatedTask.usuarioId;
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
      status: [''],
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
  refreshDataListTask() {
    this.refreshList.emit();
  }

  showDialog(item: any) {
    this.taskUpdate = { ...item };
    this.visible = true;

    if (item) {
      this.registerForm.get('titulo')?.setValue(item.titulo);
      this.registerForm.get('descricao')?.setValue(item.descricao);
      this.registerForm.get('categoria')?.setValue(item.categoria);

      const selectedFrequency = this.frequence.find(
        (f) => f.choose === item.frequencia
      );
      this.registerForm.get('frequencia')?.setValue(selectedFrequency || null);

      this.registerForm
        .get('dataInicio')
        ?.setValue(this.parseDate(item.dataInicio));
      this.registerForm.get('dataFim')?.setValue(this.parseDate(item.dataFim));
    }
  }

  parseDate(dateString: string): Date {
    if (!dateString) return new Date();

    const parts = dateString.split('-'); // Divide "01-02-2025" em ["01", "02", "2025"]
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])); // Ano, Mês (0-indexado), Dia
  }
  onUpdateTask() {
    const formData = { ...this.registerForm.value };
    formData.status = this.taskUpdate.status;
    formData.frequencia = formData.frequencia.choose;
    formData.dataInicio = this.formatDate(formData.dataInicio);
    formData.dataFim = this.formatDate(formData.dataFim);

    try {
      this.loading = true;
      if (this.registerForm.valid) {
        this.service
          .updateTask(this.idUser, this.taskUpdate.id, formData)
          .subscribe({
            next: (value) => {
              this.showToasRight(
                'success',
                'Tarefa Atualizada!',
                'Sua Tarefa foi atualizado com sucesso!'
              );
              this.refreshDataListTask()
              this.loading = false;
            },
            error: (err) => {
              console.error('Erro para atualizar tarefa', err.error);
              this.showToasRight(
                'error',
                'Erro ao atualizar tarefa',
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

  formatDate(date: Date): string {
    if (!date) return ''; // Caso esteja vazio

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque Janeiro é 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
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
}
