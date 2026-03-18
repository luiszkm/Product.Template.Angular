import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ChartPoint {
  month: string;
  vendas: number;
  meta: number;
}

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  template: `
    <div class="chart-container">
      <h3 class="chart-title">Vendas vs Meta</h3>
      <div class="chart" style="height: 300px">
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="vendasGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="var(--chart-1)" stop-opacity="0.3" />
              <stop offset="100%" stop-color="var(--chart-1)" stop-opacity="0" />
            </linearGradient>
          </defs>
          <g class="chart-grid">
            @for (i of [0,1,2,3,4]; track i) {
              <line [attr.x1]="padding" [attr.y1]="padding + i * 40" [attr.x2]="400 - padding" [attr.y2]="padding + i * 40" stroke="var(--border)" stroke-dasharray="3 3" />
            }
            @for (i of [0,1,2,3,4,6]; track i) {
              <line [attr.x1]="padding + i * 60" [attr.y1]="padding" [attr.x2]="padding + i * 60" [attr.y2]="200 - padding" stroke="var(--border)" stroke-dasharray="3 3" />
            }
          </g>
          <path [attr.d]="vendasPath()" fill="none" stroke="var(--chart-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path [attr.d]="metaPath()" fill="none" stroke="var(--chart-2)" stroke-width="2" stroke-dasharray="5 5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  `,
  styleUrl: './sales-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesChartComponent {
  protected readonly padding = 40;
  private readonly data: ChartPoint[] = [
    { month: 'Jan', vendas: 45000, meta: 50000 },
    { month: 'Fev', vendas: 52000, meta: 50000 },
    { month: 'Mar', vendas: 48000, meta: 50000 },
    { month: 'Abr', vendas: 61000, meta: 55000 },
    { month: 'Mai', vendas: 55000, meta: 55000 },
    { month: 'Jun', vendas: 67000, meta: 60000 }
  ];

  private getScale() {
    const max = Math.max(...this.data.flatMap(d => [d.vendas, d.meta]));
    const min = Math.min(...this.data.flatMap(d => [d.vendas, d.meta]));
    const range = max - min || 1;
    const chartHeight = 200 - this.padding * 2;
    return (v: number) => chartHeight - ((v - min) / range) * chartHeight + this.padding;
  }

  protected vendasPath(): string {
    const scale = this.getScale();
    const width = 400 - this.padding * 2;
    const step = width / (this.data.length - 1) || 0;
    const points = this.data.map((d, i) => `${this.padding + i * step},${scale(d.vendas)}`);
    return `M ${points.join(' L ')}`;
  }

  protected metaPath(): string {
    const scale = this.getScale();
    const width = 400 - this.padding * 2;
    const step = width / (this.data.length - 1) || 0;
    const points = this.data.map((d, i) => `${this.padding + i * step},${scale(d.meta)}`);
    return `M ${points.join(' L ')}`;
  }
}
