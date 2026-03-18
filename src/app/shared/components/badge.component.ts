import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span class="badge badge--{{ variant() }}">
      <ng-content />
    </span>
  `,
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('neutral');
}
