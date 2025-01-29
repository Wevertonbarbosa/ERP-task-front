import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputGlobalComponent } from '../../../../Components/input-global/input-global.component';
import { ToastGlobalComponent } from '../../../../Components/toast-global/toast-global.component';
import { CategoryExpense } from '../../../../Interface/categoryExpense';

@Component({
  selector: 'app-form-expense',
  imports: [
    CardModule,
    ButtonModule,
    SelectModule,
    FloatLabel,
    TextareaModule,
    FormsModule,
    ReactiveFormsModule,
    InputGlobalComponent,
    CommonModule,
    ToastGlobalComponent,
  ],
  templateUrl: './form-expense.component.html',
  styleUrl: './form-expense.component.css',
  providers: [MessageService],
})
export class FormExpenseComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false;
  keyToast: string = 'br';
  typeCategory: CategoryExpense[] = [];

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.typeCategory = [
      { category: 'Essencial' },
      { category: 'Não essencial' },
    ];

    this.registerForm = this.fb.group({
      valor: ['', [Validators.required]],
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      categoria: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onExpense() {}
}
