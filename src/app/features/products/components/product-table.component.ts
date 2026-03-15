import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTableComponent {
  readonly items = input.required<Product[]>();
  readonly loading = input<boolean>(false);
  readonly remove = output<string>();

  trackById(index: number, item: Product): string {
    return item.id;
  }

  onRemove(id: string): void {
    this.remove.emit(id);
  }
}
