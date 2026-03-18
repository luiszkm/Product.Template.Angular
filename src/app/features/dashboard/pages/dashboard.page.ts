import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-angular';
import { MetricCardComponent } from '../components/metric-card.component';
import { SalesChartComponent } from '../components/sales-chart.component';
import { RevenueChartComponent } from '../components/revenue-chart.component';
import { BadgeComponent } from '../../../shared/components/badge.component';

interface Transaction {
  id: string;
  customer: string;
  amount: string;
  status: string;
  statusLabel: string;
  statusVariant: 'success' | 'warning' | 'error';
  date: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MetricCardComponent,
    SalesChartComponent,
    RevenueChartComponent,
    BadgeComponent
  ],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  protected readonly icons = {
    DollarSign,
    Users,
    ShoppingCart,
    TrendingUp
  };

  protected readonly transactions: Transaction[] = [
    { id: '#12345', customer: 'Maria Santos', amount: 'R$ 1.250,00', status: 'completed', statusLabel: 'Concluído', statusVariant: 'success', date: '17/03/2026' },
    { id: '#12346', customer: 'Pedro Oliveira', amount: 'R$ 890,00', status: 'pending', statusLabel: 'Pendente', statusVariant: 'warning', date: '17/03/2026' },
    { id: '#12347', customer: 'Ana Costa', amount: 'R$ 2.100,00', status: 'completed', statusLabel: 'Concluído', statusVariant: 'success', date: '16/03/2026' },
    { id: '#12348', customer: 'Carlos Silva', amount: 'R$ 450,00', status: 'failed', statusLabel: 'Falhou', statusVariant: 'error', date: '16/03/2026' },
    { id: '#12349', customer: 'Juliana Lima', amount: 'R$ 3.200,00', status: 'completed', statusLabel: 'Concluído', statusVariant: 'success', date: '15/03/2026' }
  ];
}
