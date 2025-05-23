import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { UserPaymentService } from '../../../../Service/user-payment.service';
import { UserGlobalService } from '../../../../Service/user-global.service';

@Component({
  selector: 'app-performance-dashboard',
  imports: [
    CardModule,
    CommonModule,
    ScrollPanelModule,
    FieldsetModule,
    DividerModule,
  ],
  templateUrl: './performance-dashboard.component.html',
  styleUrl: './performance-dashboard.component.css',
  providers: [UserPaymentService],
})
export class PerformanceDashboardComponent implements OnInit {
  userId!: number;
  totalPoints!: number;
  donePoints!: number;
  donePercentage!: number;
  valueProportional!: number;

  constructor(
    private serviceUserGlobal: UserGlobalService,
    private service: UserPaymentService
  ) {}

  ngOnInit() {
    this.serviceUserGlobal.user$.subscribe((updatedUser) => {
      this.userId = updatedUser.usuarioId;
    });
    this.getPerformance(this.userId);
  }

  getPerformance(id: number) {
    try {
      this.service.getPerformanceDashboard(id).subscribe({
        next: (value) => {
          this.totalPoints = value.totalPontosPeriodo || 0;
          this.donePoints = value.pontosConcluidos || 0;
          this.donePercentage = value.percentualConclusao || 0;
          this.valueProportional = value.valorProporcional || 0;
        },
        error: (err) => {
          console.error('Erro para carregar os dados do painel ', err.error);
        },
      });
    } catch (error) {
      console.error('Error do Try Catch', error);
    }
  }

  formatValueCurrencyBR(valor: number): string {
    if (valor === undefined || valor === null) {
      return 'R$ 0,00';
    }
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
