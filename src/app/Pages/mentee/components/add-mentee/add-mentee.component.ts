import { Component, OnInit, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Select } from 'primeng/select';
import { InputGlobalComponent } from '../../../../Components/input-global/input-global.component';
import { ToastGlobalComponent } from '../../../../Components/toast-global/toast-global.component';
import { InputPasswordGlobalComponent } from '../../../../Components/input-password-global/input-password-global.component';
import { User } from '../../../../Interface/user';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-mentee',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Select,
    SelectModule,
    CommonModule,
    ButtonModule,
    DialogModule,
    InputGlobalComponent,
    ToastGlobalComponent,
    InputPasswordGlobalComponent,
  ],
  templateUrl: './add-mentee.component.html',
  styleUrl: './add-mentee.component.css',
  providers: [MessageService],
})
export class AddMenteeComponent implements OnInit {
  @Input() visible!: boolean;
  registerForm!: FormGroup;
  loading: boolean = false;
  keyToast: string = 'br';

  typeUser: User[] = [];

  classError = ['w-full', 'ng-dirty', 'ng-invalid'];
  class = ['w-full'];

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.typeUser = [{ role: 'USER' }, { role: 'ADMIN', disabled: true }];

    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      role: [this.typeUser[0], Validators.required],
    });
  }

  onAddNewMentee() {}

  showDialog() {
    this.visible = true;
  }
}
