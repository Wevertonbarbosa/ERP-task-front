import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGlobalComponent } from '../../Components/input-global/input-global.component';

@Component({
  selector: 'app-check-email',
  imports: [
    InputGlobalComponent,
    InputTextModule,
    FieldsetModule,
    FormsModule,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './check-email.component.html',
  styleUrl: './check-email.component.css',
})
export class CheckEmailComponent {
  email: string = '';

  onSubmit() {
    console.log('check email attempt:', this.email);
  }
}
