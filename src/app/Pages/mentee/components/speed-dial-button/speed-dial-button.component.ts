import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { UpdateMenteeComponent } from '../update-mentee/update-mentee.component';

@Component({
  selector: 'app-speed-dial-button',
  imports: [SpeedDialModule, AddPaymentComponent, UpdateMenteeComponent],
  templateUrl: './speed-dial-button.component.html',
  styleUrl: './speed-dial-button.component.css',
})
export class SpeedDialButtonComponent implements OnInit {
  items!: MenuItem[];
  visiblePayment: boolean = false;
  visibleUpdateMentee: boolean = false;

  @ViewChild(AddPaymentComponent) addPaymentComponent!: AddPaymentComponent;
  @ViewChild(UpdateMenteeComponent)
  updateMenteeComponent!: UpdateMenteeComponent;

  ngOnInit() {
    this.items = [
      {
        label: 'Editar usuário',
        icon: 'pi pi-file-edit',
        command: () => {
          if (this.updateMenteeComponent) {
            this.updateMenteeComponent.showDialog();
          }
        },
      },
      {
        label: 'Definir mesada',
        icon: 'pi pi-wallet',
        command: () => {
          if (this.addPaymentComponent) {
            this.addPaymentComponent.showDialog();
          }
        },
      },
    ];
  }
}
