import { Component, Input, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
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
import { User } from '../../../../Interface/user';
import { MessageService } from 'primeng/api';
import { ToastGlobalComponent } from '../../../../Components/toast-global/toast-global.component';
import { InputPasswordGlobalComponent } from '../../../../Components/input-password-global/input-password-global.component';
import { InputGlobalComponent } from '../../../../Components/input-global/input-global.component';

@Component({
  selector: 'app-update-mentee',
  imports: [
    DrawerModule,
    ReactiveFormsModule,
    OverlayBadgeModule,
    ChipModule,
    DividerModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    SelectModule,
    Select,
    ToastGlobalComponent,
    InputPasswordGlobalComponent,
    InputGlobalComponent,
  ],
  templateUrl: './update-mentee.component.html',
  styleUrl: './update-mentee.component.css',
  providers: [MessageService],
})
export class UpdateMenteeComponent implements OnInit {
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

  showDialog() {
    this.visible = true;
  }

  updateMentee() {}
}
