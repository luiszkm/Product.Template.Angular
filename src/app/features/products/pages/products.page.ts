import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ProductFormComponent, ProductFormValue } from '../components/product-form.component';
import { ProductTableComponent } from '../components/product-table.component';
import { ProductsStore } from '../state/products.store';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductFormComponent, ProductTableComponent],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
  providers: [ProductsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPage implements OnInit {
  private readonly store = inject(ProductsStore);

  readonly vm = this.store.vm;

  ngOnInit(): void {
    this.store.load();
  }

  onCreate(input: ProductFormValue): void {
    this.store.create(input);
  }

  onRemove(id: string): void {
    this.store.remove(id);
  }
}
