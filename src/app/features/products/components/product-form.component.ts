import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface ProductFormValue {
  name: string;
  sku: string;
  price: number;
  stock: number;
}

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

  readonly create = output<ProductFormValue>();

  /** Erros de validação vindos da API (problem.errors do backend) */
  readonly apiErrors = input<Record<string, string[]> | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    name:  ['', [Validators.required, Validators.minLength(2)]],
    sku:   ['', [Validators.required, Validators.minLength(3)]],
    price: [0,  [Validators.required, Validators.min(0.01)]],
    stock: [0,  [Validators.required, Validators.min(0)]]
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
    if (ctrl.hasError('required'))   return 'Campo obrigatório.';
    if (ctrl.hasError('minlength'))  return `Mínimo ${ctrl.getError('minlength').requiredLength} caracteres.`;
    if (ctrl.hasError('min'))        return `Valor mínimo: ${ctrl.getError('min').min}.`;
    if (ctrl.hasError('apiError'))   return ctrl.getError('apiError') as string;
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.create.emit(this.form.getRawValue());
    this.form.reset({ name: '', sku: '', price: 0, stock: 0 });
  }
}
