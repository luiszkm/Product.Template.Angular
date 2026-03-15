import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  template: `
    <section>
      <h2>Orders</h2>
      <p>Placeholder para feature orders (lazy loaded).</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPage {}
