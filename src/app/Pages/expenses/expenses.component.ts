import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../Components/menu/menu.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { FormExpenseComponent } from './components/form-expense/form-expense.component';

import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpensesService } from '../../Service/expenses.service';
import { UserGlobalService } from '../../Service/user-global.service';
import { UserService } from '../../Service/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-expenses',
  imports: [
    MenuComponent,
    ToastModule,
    InputNumberModule,
    ConfirmDialogModule,
    FormsModule,
    CommonModule,
    CardModule,
    ButtonModule,
    DividerModule,
    TableModule,
    TabsModule,
    FormExpenseComponent,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  providers: [
    ExpensesService,
    UserService,
    ConfirmationService,
    MessageService,
  ],
})
export class ExpensesComponent implements OnInit {
  userId!: number;
  userRole!: string;
  loading: boolean = false;
  loadingDelete: boolean = false;

  totalBalance = 0;
  totalValueEssential = 0;
  totalValueNo_essential = 0;
  valueExpenseTotal = 0;

  listEssentialExpenses: any[] = [];
  listEssentialExpensesNo: any[] = [];

  constructor(
    private service: ExpensesService,
    private serviceUser: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private serviceUserGlobal: UserGlobalService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedUser) => {
      this.userId = updatedUser.usuarioId;
      this.userRole = updatedUser.role
    });
    
    

    this.getTotalExpensesUser();
    this.getUserById();
    this.getUserExpenseList();
    this.getCategoryTotal();
  }

  getUserById() {
    try {
      this.serviceUser.getUserById(this.userId).subscribe({
        next: (value) => {
          this.totalBalance = value.saldoTotal;
        },
        error: (err) => {
          console.error(
            'Erro para carregar os dados de saldo total ',
            err.error
          );
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  getCategoryTotal() {
    try {
      this.service.getResultTotalExpenseCategory(this.userId).subscribe({
        next: (value) => {
          if (value === null) {
            this.totalValueEssential = 0;
            this.totalValueNo_essential = 0;
            return;
          }

          this.totalValueEssential = value.totalEssencial;
          this.totalValueNo_essential = value.totalNaoEssencial;
        },
        error: (err) => {
          console.error(
            'Erro para carregar os dados de gastos total por categorias ',
            err.error
          );
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  getTotalExpensesUser() {
    try {
      this.service.getExpensesTotal(this.userId).subscribe({
        next: (value) => {
          this.valueExpenseTotal = value;
        },
        error: (err) => {
          console.error(
            'Erro para carregar os dados de gastos total ',
            err.error
          );
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  getUserExpenseList() {
    try {
      this.service.getListExpensesUser(this.userId).subscribe({
        next: (value) => {
          this.listEssentialExpenses = value.filter(
            (expense: any) => expense.categoria === 'ESSENCIAL'
          );

          this.listEssentialExpensesNo = value.filter(
            (expense: any) => expense.categoria === 'NAO_ESSENCIAL'
          );
        },
        error: (err) => {
          console.error(
            'Erro para carregar os dados de gastos total ',
            err.error
          );
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  reloadTableData() {
    this.loading = true;

    setTimeout(() => {
      this.getUserExpenseList();
      this.getTotalExpensesUser();
      this.getCategoryTotal();
      this.getUserById();
      this.loading = false;
    }, 3000);
  }

  deleteExpense(item: any) {
    console.log(item);

    this.confirmationService.confirm({
      target: item.target as EventTarget,
      message: 'Deseja realmente excluir este gasto?',
      header: 'Excluir gasto',
      closable: false,
      closeOnEscape: true,
      icon: 'pi pi-trash',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger',
      },
      accept: () => {
        this.deleteExpenseUser(item.id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Gasto não foi excluido',
          detail: 'Gasto do usuário não foi excluido',
          life: 3000,
        });
      },
    });
  }

  deleteExpenseUser(idExpense: number) {
    try {
      this.loadingDelete = true;
      this.service.deleteExpense(idExpense).subscribe({
        next: () => {
          setTimeout(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Gasto Excluido',
              detail: 'Gasto excluido com sucesso',
            });

            this.getUserExpenseList();
            this.getTotalExpensesUser();
            this.getCategoryTotal();
            this.getUserById();
            this.loadingDelete = false;
          }, 2000);
        },
        error: (err) => {
          console.error('Erro para excluir os dados ', err.error);
          this.loadingDelete = false;
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
      this.loadingDelete = false;
    }
  }

  formatDate(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  formatValueCurrencyBR(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
