import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { Order } from '../models/order.model';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './orders.page.html',
  styleUrl: './orders.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPage implements OnInit {
  private readonly ordersService = inject(OrdersService);

  readonly loading = signal(false);
  readonly items = signal<Order[]>([]);
  readonly totalCount = signal(0);

  ngOnInit(): void {
    this.loading.set(true);
    this.ordersService
      .list({ pageNumber: 1, pageSize: 20 })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.items.set(res.data);
          this.totalCount.set(res.totalCount);
        }
      });
  }

  trackById(_index: number, item: Order): string {
    return item.id;
  }
}
