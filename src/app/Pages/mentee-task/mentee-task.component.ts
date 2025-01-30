import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../Components/menu/menu.component';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { Select } from 'primeng/select';
import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { InputGlobalComponent } from '../../Components/input-global/input-global.component';
import { ToastGlobalComponent } from '../../Components/toast-global/toast-global.component';
import { Frequence } from '../../Interface/frequence';

@Component({
  selector: 'app-mentee-task',
  imports: [
    MenuComponent,
    AvatarModule,
    DividerModule,
    FloatLabel,
    CardModule,
    SelectModule,
    FieldsetModule,
    Select,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    DatePickerModule,
    TextareaModule,
    InputGlobalComponent,
    ToastGlobalComponent,
  ],
  templateUrl: './mentee-task.component.html',
  styleUrl: './mentee-task.component.css',
  providers: [MessageService]
})
export class MenteeTaskComponent implements OnInit {
  registerForm!: FormGroup;

  loading: boolean = false;
  keyToast: string = 'br';

  frequence: Frequence[] = [];
  dateStart: Date | undefined;

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
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

  onAddTaskMentee() {}
}
