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
import { TaskService } from '../../../../Service/task.service';
import { UserGlobalService } from '../../../../Service/user-global.service';

@Component({
  selector: 'app-dataview',
  imports: [
    DataViewModule,
    ToggleSwitchModule,
    DividerModule,
    ReactiveFormsModule,
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
  providers: [ConfirmationService, MessageService, TaskService],
})
export class DataviewComponent implements OnInit {
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  products: any[] = [];
  checked: boolean = false;

  userId!: number;

  visible: boolean = false;
  visibleUpdate: boolean = false;

  allProducts: any[] = [];

  @ViewChild(AddTaskComponent) addTaskComponent!: AddTaskComponent;
  @ViewChild(UpdateTaskComponent) updateTaskComponent!: UpdateTaskComponent;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: TaskService,
    private serviceUserGlobal: UserGlobalService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedUser) => {
      this.userId = updatedUser.usuarioId;
    });

    try {
      this.service.getTasks(this.userId).subscribe({
        next: (value) => {
          this.allProducts = value;
          this.products = value.map((task: any) => ({
            titulo: task.titulo,
            descricao: task.descricao,
            categoria: task.categoria,
            frequencia: task.frequencia,
            dataInicio: task.dataInicio,
            dataFim: task.dataFim,
            diasSemana: '13208',
          }));

          this.products = [...this.allProducts];
        },
        error: (err) => {
          console.error('Erro para carregar os dados ', err.error);
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }

    this.sortOptions = [
      { label: 'DIARIA', value: 'DIARIA' },
      { label: 'SEMANAL', value: 'SEMANAL' },
      { label: 'MENSAL', value: 'MENSAL' },
      { label: 'ESPORÁDICO', value: 'ESPORÁDICO' },
      { label: 'TODAS', value: 'TODAS' }
    ];
  }

  openModalAddTask() {
    if (this.addTaskComponent) {
      this.addTaskComponent.showDialog();
    }
  }

  openModalUpdateTask() {
    if (this.updateTaskComponent) {
      this.visibleUpdate = true;
      this.updateTaskComponent.onUpdateTask();
    }
  }

  onSortChange(event: any) {
    const selectedFrequencia = event.value; // Frequência selecionada (DIARIA, SEMANAL, etc.)

    // Filtra a lista com base na frequência selecionada
    if (selectedFrequencia === 'TODAS') {
      this.products = this.allProducts; // Exibe todas as tarefas, sem filtro
    } else {
      this.products = this.allProducts.filter(
        (task) => task.frequencia === selectedFrequencia
      );
    }
  }

  confirmTaskDone(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja concluír a tarefa?',
      header: 'Concluír tarefa',
      closable: true,
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
      },
      reject: () => {
        this.checked = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Tarefa não concluída',
          detail: 'Sua tarefa não foi concluída',
          life: 3000,
        });
      },
    });
  }

  deleteTask(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
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
