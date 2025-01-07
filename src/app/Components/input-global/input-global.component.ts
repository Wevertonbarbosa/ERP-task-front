import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-global',
  imports: [FloatLabel, CommonModule, FormsModule, InputTextModule],
  templateUrl: './input-global.component.html',
  styleUrl: './input-global.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGlobalComponent {
  @Input() model!: string;
  @Input() name!: string;
  @Input() id!: string;
  @Input() label!: string;
  @Input() typeInput!: string;
}
