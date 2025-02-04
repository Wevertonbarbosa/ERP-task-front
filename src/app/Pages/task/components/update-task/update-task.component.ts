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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  providers: [ConfirmationService, MessageService],
})
export class UpdateTaskComponent implements OnInit {
  @Input() visible!: boolean;

  registerForm!: FormGroup;
  loading: boolean = false;
  keyToast: string = 'br';
  frequence: Frequence[] = [];

  taskUpdate!: any;

  dateStart: Date | undefined;

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dateStart = new Date();
    this.dateStart.getDate();
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

  showDialog(item: any) {
    this.taskUpdate = item;
    this.visible = true;
  }
  onUpdateTask() {}
}
