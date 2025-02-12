import { Component, OnInit, ViewChild } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AddTaskComponent } from '../add-task/add-task.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TaskService } from '../../../../Service/task.service';
import { UserGlobalService } from '../../../../Service/user-global.service';
import { TaskCheckService } from '../../../../Service/task-check.service';
import { SignalTask } from '../../../../Interface/signalTask';

@Component({
  selector: 'app-dataview',
  imports: [
    DataViewModule,
    ToggleSwitchModule,
    DividerModule,
    ReactiveFormsModule,
    ToggleButtonModule,
    TooltipModule,
    FormsModule,
    ConfirmDialogModule,
    ScrollPanelModule,
    ToastModule,
    CommonModule,
    ConfirmPopupModule,
    Tag,
    ButtonModule,
    DropdownModule,
    SelectModule,
    AddTaskComponent,
    UpdateTaskComponent,
  ],
  templateUrl: './dataview.component.html',
  styleUrl: './dataview.component.css',
  providers: [
    ConfirmationService,
    MessageService,
    TaskService,
    TaskCheckService,
  ],
})
export class DataviewComponent implements OnInit {
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  products: any[] = [];
  valueSignalDone!: SignalTask[];
  statusSignalTaks: any[] = [];

  userId!: number;
  userRole!: string;

  visible: boolean = false;
  visibleUpdate: boolean = false;

  allProducts: any[] = [];
  doneTaskCheck: boolean = false;
  signalChecked: boolean = false;

  @ViewChild(AddTaskComponent) addTaskComponent!: AddTaskComponent;
  @ViewChild(UpdateTaskComponent) updateTaskComponent!: UpdateTaskComponent;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: TaskService,
    private serviceTaskCheck: TaskCheckService,
    private serviceUserGlobal: UserGlobalService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedUser) => {
      this.userId = updatedUser.usuarioId;
      this.userRole = updatedUser.role;
    });

    this.getTaskUser();

    this.sortOptions = [
      { label: 'DIARIA', value: 'DIARIA' },
      { label: 'SEMANAL', value: 'SEMANAL' },
      { label: 'MENSAL', value: 'MENSAL' },
      { label: 'ESPORÁDICO', value: 'ESPORÁDICO' },
      { label: 'TODAS', value: 'TODAS' },
    ];
  }

  getTaskUser() {
    try {
      this.service.getTasks(this.userId).subscribe({
        next: (value) => {
          this.serviceTaskCheck.getTaskSignal(this.userId).subscribe({
            next: (signalTasks) => {
              const signalMap = new Map(
                signalTasks.map((task: any) => [
                  task.tarefa,
                  task.sinalizadaUsuario,
                ])
              );
              const doneMap = new Map(
                signalTasks.map((task: any) => [task.tarefa, task.concluida])
              );

              this.allProducts = value.map((task: any) => ({
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
                sinalizadaUsuario: signalMap.get(task.id) ?? false,
                done: doneMap.get(task.id) ?? false,
              }));

              this.products = [...this.allProducts];
            },
          });
        },
        error: (err) => {
          console.error('Erro para carregar os dados ', err.error);
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  deleteTaskUser(idTask: number) {
    try {
      this.service.deleteTask(idTask, this.userId).subscribe({
        next: (value) => {
          this.getTaskUser();
        },
        error: (err) => {
          console.error('Erro para deletar tarefa ', err.error);
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

  openModalAddTask() {
    if (this.addTaskComponent) {
      this.addTaskComponent.showDialog();
    }
  }

  openModalUpdateTask(item: any) {
    if (this.updateTaskComponent) {
      this.updateTaskComponent.showDialog(item);
      this.visibleUpdate = true;
    }
  }

  onSortChange(event: any) {
    const selectedFrequencia = event.value;

    if (selectedFrequencia === 'TODAS') {
      this.products = [...this.allProducts]; // Exibe todas as tarefas, já formatadas
    } else {
      this.products = this.allProducts.filter(
        (task) => task.frequencia === selectedFrequencia
      );
    }
  }

  confirmTaskDone(item: any) {
    this.confirmationService.confirm({
      target: item.target as EventTarget,
      message: 'Tem certeza que deseja concluír a tarefa?',
      header: 'Concluír tarefa',
      closable: false,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmar',
      },
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Concluír tarefa',
          detail: 'Tarefa concluída com sucesso',
        });
        this.doneTaskCheck = true;
      },
      reject: () => {
        item.checked = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Tarefa não concluída',
          detail: 'Sua tarefa não foi concluída',
          life: 3000,
        });
      },
    });
  }

  signalTask(item: any) {
    this.confirmationService.confirm({
      target: item.target as EventTarget,
      message:
        'Sinalizar tarefa para o mentor responsável aprovar a conclusão da tarefa!',
      header: 'Sinalizar tarefa como concluída',
      closable: false,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sinalizar',
      },
      accept: () => {
        const valueSignalTask = item.sinalizadaUsuario;
        this.valueSignalDone = [{ sinalizadaUsuario: valueSignalTask }];

        this.postTaskSignalDoneUser(
          item.id,
          item.responsavelId,
          this.valueSignalDone[0]
        );

        this.messageService.add({
          severity: 'success',
          summary: 'Tarefa sinalizada',
          detail: 'Tarefa sinalizada com sucesso',
        });
      },
      reject: () => {
        item.sinalizadaUsuario = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Tarefa não sinalizada',
          detail: 'Sua tarefa não foi sinalizada',
          life: 3000,
        });
      },
    });
  }

  postTaskSignalDoneUser(idTask: number, idUser: number, data: any) {
    try {
      this.serviceTaskCheck.postSignalTask(idTask, idUser, data).subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (err) => {
          console.error('Error para sinalizar tarefa concluida', err);
        },
      });
    } catch (error) {
      console.error('Error no Try Catch', error);
    }
  }

  deleteTask(item: any) {
    this.confirmationService.confirm({
      target: item.target as EventTarget,
      message: 'Você tem certeza que deseja excluir essa tarefa',
      header: 'Deletar tarefa',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Deletar',
        severity: 'danger',
      },
      accept: () => {
        this.deleteTaskUser(item.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Tarefa excluída',
          detail: 'Sua tarefa foi excluída com sucesso',
          life: 3000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Tarefa',
          detail: 'Sua tarefa não foi excluída',
          life: 3000,
        });
      },
    });
  }
}
