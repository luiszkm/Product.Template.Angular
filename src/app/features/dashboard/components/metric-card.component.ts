import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import type { LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="metric-card">
      <div class="metric-card__content">
        <div class="metric-card__left">
          <span class="metric-card__title">{{ title() }}</span>
          <span class="metric-card__value">{{ value() }}</span>
          <div class="metric-card__change" [class.metric-card__change--up]="changeUp()" [class.metric-card__change--down]="!changeUp()">
            <span class="metric-card__change-value">{{ change() }}</span>
            <span class="metric-card__change-label">vs mês anterior</span>
          </div>
        </div>
        <div class="metric-card__icon">
          <lucide-icon [img]="icon()" [size]="20" aria-hidden="true" />
        </div>
      </div>
    </div>
  `,
  styleUrl: './metric-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<string>();
  readonly change = input.required<string>();
  readonly changeUp = input<boolean>(true);
  readonly icon = input.required<LucideIconData>();
}
