import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, UpdateProductRequest } from '../models/product.model';
import type { ProductFormValue } from './product-form.types';

export type { ProductFormValue } from './product-form.types';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly mode = input<'create' | 'edit'>('create');
  readonly initialProduct = input<Product | null>(null);

  readonly create = output<ProductFormValue>();
  readonly update = output<UpdateProductRequest>();

  /** Erros de validação vindos da API (problem.errors do backend) */
  readonly apiErrors = input<Record<string, string[]> | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    sku: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  private readonly _syncMode = effect(() => {
    const m = this.mode();
    const p = this.initialProduct();
    if (m === 'edit' && p) {
      this.form.patchValue({
        name: p.name,
        sku: p.sku,
        price: p.price,
        stock: p.stock
      });
    } else if (m === 'create') {
      this.form.reset({ name: '', sku: '', price: 0, stock: 0 });
    }
  });

  private readonly _applyApiErrors = effect(() => {
    const errors = this.apiErrors();
    if (!errors) return;
    for (const [field, messages] of Object.entries(errors)) {
      const ctrl = this.form.get(field.toLowerCase());
      if (ctrl) ctrl.setErrors({ apiError: messages[0] });
    }
  });

  fieldError(name: keyof typeof this.form.controls): string | null {
    const ctrl = this.form.controls[name];
    if (!ctrl.touched || ctrl.valid) return null;
    if (ctrl.hasError('required')) return 'Campo obrigatório.';
    if (ctrl.hasError('minlength')) return `Mínimo ${ctrl.getError('minlength').requiredLength} caracteres.`;
    if (ctrl.hasError('min')) return `Valor mínimo: ${ctrl.getError('min').min}.`;
    if (ctrl.hasError('apiError')) return ctrl.getError('apiError') as string;
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    if (this.mode() === 'edit') {
      const p = this.initialProduct();
      if (p) {
        this.update.emit({ id: p.id, ...raw });
      }
    } else {
      this.create.emit(raw);
      this.form.reset({ name: '', sku: '', price: 0, stock: 0 });
    }
  }
}
