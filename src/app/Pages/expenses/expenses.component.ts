import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../Components/menu/menu.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { FormExpenseComponent } from "./components/form-expense/form-expense.component";

@Component({
  selector: 'app-expenses',
  imports: [
    MenuComponent,
    CardModule,
    ButtonModule,
    DividerModule,
    TableModule,
    TabsModule,
    FormExpenseComponent
],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent implements OnInit {
  products!: any[];
  
  ngOnInit() {
    this.products = [
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
      { code: '01', produto: 'Aluguel', category: 'Essencial', preco: 1000 },
    ];
  }
}
