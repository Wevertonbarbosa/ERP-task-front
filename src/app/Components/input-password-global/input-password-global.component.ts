import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-input-password-global',
  imports: [PasswordModule, FormsModule, CommonModule, DividerModule],
  templateUrl: './input-password-global.component.html',
  styleUrl: './input-password-global.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordGlobalComponent {
  @Input() model!: string;
  @Input() name!: string;
  @Input() id!: string;

}
