import { Component, OnInit } from '@angular/core';
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

import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-dataview',
  imports: [
    DataViewModule,
    ToggleSwitchModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
    ScrollPanelModule,
    ToastModule,
    CommonModule,
    Tag,
    ButtonModule,
    DropdownModule,
    SelectModule,
  ],
  templateUrl: './dataview.component.html',
  styleUrl: './dataview.component.css',
  providers: [ConfirmationService, MessageService],
})
export class DataviewComponent implements OnInit {
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  products = <any>[];

  checked: boolean = false;

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
      {
        titulo: 'Segundo titulo',
        descricao: 'Comprar comida',
        categoria: 'Comida',
        frequencia: 'DIARIO',
        dataInicio: '02/02/2025',
        dataFim: '10/02/2025',
        diasSemana: '13208',
      },
    ];
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

  confirm1(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
      },
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.checked = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
