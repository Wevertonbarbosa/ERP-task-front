import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';

@Component({
  selector: 'app-speed-dial-button',
  imports: [SpeedDialModule],
  templateUrl: './speed-dial-button.component.html',
  styleUrl: './speed-dial-button.component.css',
})
export class SpeedDialButtonComponent implements OnInit {
  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Editar usuário',
        icon: 'pi pi-file-edit',
        command: () => {},
      },
      {
        label: 'Definir mesada',
        icon: 'pi pi-wallet',
        command: () => {},
      },
    ];
  }
}
