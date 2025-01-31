import { Component, OnInit, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputGlobalComponent } from '../../../../Components/input-global/input-global.component';
import { MessageService } from 'primeng/api';
import { ToastGlobalComponent } from '../../../../Components/toast-global/toast-global.component';

@Component({
  selector: 'app-add-payment',
  imports: [
    InputGlobalComponent,
    FormsModule,
    DividerModule,
    FieldsetModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    DialogModule,
    ToastGlobalComponent,
  ],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.css',
  providers: [MessageService],
})
export class AddPaymentComponent implements OnInit {
  @Input() visible!: boolean;
  registerForm!: FormGroup;
  loading: boolean = false;
  keyToast: string = 'br';

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.registerForm = this.fb.group({
      mesada: ['', [Validators.required]],
    });
  }

  onAddPayment() {}

  showDialog() {
    this.visible = true;
  }
}
