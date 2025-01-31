import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from '../../Components/menu/menu.component';
import { KnobModule } from 'primeng/knob';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { SpeedDialModule } from 'primeng/speeddial';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import {
  FormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { SpeedDialButtonComponent } from './components/speed-dial-button/speed-dial-button.component';
import { AddMenteeComponent } from './components/add-mentee/add-mentee.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';

@Component({
  selector: 'app-mentee',
  imports: [
    MenuComponent,
    DataViewModule,
    ScrollPanelModule,
    SelectModule,
    DividerModule,
    FormsModule,
    TooltipModule,
    ReactiveFormsModule,
    KnobModule,
    CardModule,
    CommonModule,
    SpeedDialModule,
    ButtonModule,
    SpeedDialButtonComponent,
    AddMenteeComponent,
  ],
  templateUrl: './mentee.component.html',
  styleUrl: './mentee.component.css',
})
export class MenteeComponent implements OnInit {
  products!: any[];

  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;

  visible: boolean = false;
  // visiblePayment: boolean = false;
  value: number = 60;

  @ViewChild(AddMenteeComponent) addMenteeComponent!: AddMenteeComponent;
  @ViewChild(AddPaymentComponent) addPaymentComponent!: AddPaymentComponent;

  constructor() {}
  ngOnInit() {
    this.products = [
      {
        nome: 'Weverton',
        email: 'teste@gmail.com',
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

  openModalAddMentee() {
    if (this.addMenteeComponent) {
      this.addMenteeComponent.showDialog();
    }
  }
}
