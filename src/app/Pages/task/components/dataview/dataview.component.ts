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
  providers: [ConfirmationService, MessageService],
})
export class DataviewComponent implements OnInit {
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  products!: any[];
  checked: boolean = false;

  visible: boolean = false;
  visibleUpdate: boolean = false;

  @ViewChild(AddTaskComponent) addTaskComponent!: AddTaskComponent;
  @ViewChild(UpdateTaskComponent) updateTaskComponent!: UpdateTaskComponent;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.sortOptions = [
      { label: 'DIARIA', value: '!price' },
      { label: 'SEMANAL', value: 'price' },
      { label: 'MENSAL', value: 'price' },
      { label: 'ESPORÁDICO', value: 'price' },
    ];

    this.products = [
      {
        titulo: 'Tomar Banho',
        descricao: 'Tomar banho nesse lindo dia',
        categoria: 'Fazeres',
        frequencia: 'SEMANAL',
        dataInicio: '02/02/2025',
        dataFim: '10/02/2025',
        diasSemana: '13208',
      },
      // {
      //   titulo: 'Segundo titulo',
      //   descricao: 'Comprar comida',
      //   categoria: 'Comida',
      //   frequencia: 'DIARIO',
      //   dataInicio: '02/02/2025',
      //   dataFim: '10/02/2025',
      //   diasSemana: '13208',
      // },
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
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
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
