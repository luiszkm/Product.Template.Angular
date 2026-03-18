import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ChartPoint {
  month: string;
  receita: number;
}

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  template: `
    <div class="chart-container">
      <h3 class="chart-title">Receita Mensal</h3>
      <div class="chart" style="height: 300px">
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
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
          <path [attr.d]="areaPath()" fill="url(#revenueGradient)" />
          <path [attr.d]="linePath()" fill="none" stroke="var(--chart-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  `,
  styleUrl: './revenue-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevenueChartComponent {
  protected readonly padding = 40;
  private readonly data: ChartPoint[] = [
    { month: 'Jan', receita: 120000 },
    { month: 'Fev', receita: 145000 },
    { month: 'Mar', receita: 132000 },
    { month: 'Abr', receita: 168000 },
    { month: 'Mai', receita: 156000 },
    { month: 'Jun', receita: 189000 }
  ];

  private getScale() {
    const max = Math.max(...this.data.map(d => d.receita));
    const min = Math.min(...this.data.map(d => d.receita));
    const range = max - min || 1;
    const chartHeight = 200 - this.padding * 2;
    return (v: number) => chartHeight - ((v - min) / range) * chartHeight + this.padding;
  }

  protected linePath(): string {
    const scale = this.getScale();
    const width = 400 - this.padding * 2;
    const step = width / (this.data.length - 1) || 0;
    const points = this.data.map((d, i) => `${this.padding + i * step},${scale(d.receita)}`);
    return `M ${points.join(' L ')}`;
  }

  protected areaPath(): string {
    const scale = this.getScale();
    const width = 400 - this.padding * 2;
    const step = width / (this.data.length - 1) || 0;
    const bottom = 200 - this.padding;
    const points = this.data.map((d, i) => `${this.padding + i * step},${scale(d.receita)}`);
    return `M ${this.padding},${bottom} L ${points.join(' L ')} L ${400 - this.padding},${bottom} Z`;
  }
}
