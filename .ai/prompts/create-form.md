# Prompt AI — Criar Formulário Reativo

## Objetivo
Gerar componente de formulário standalone, com validação alinhada ao backend, exibição de erros de campo e suporte a erros da API.

## Entrada esperada
- Campos do formulário e seus tipos.
- Validações necessárias (obrigatório, formato, tamanho).
- Operação: `create` (POST) ou `update` (PUT).
- Se é campo de busca (precisa de debounce).

## Instruções para o agente

### Estrutura do componente
```ts
@Component({ standalone: true, imports: [ReactiveFormsModule], ... })
export class NomeFormComponent {
  private readonly fb = inject(FormBuilder);

  // Output da ação
  readonly submit = output<FormPayload>();

  // Input: erros vindos da API (problem.errors do backend)
  readonly apiErrors = input<Record<string, string[]> | null>(null);

  // Input: estado de loading da page/store
  readonly loading = input(false);

  readonly form = this.fb.nonNullable.group({
    campo: ['', [Validators.required, Validators.minLength(2)]],
    // ... demais campos
  });

  // Effect que mapeia erros da API nos controles
  private readonly _applyApiErrors = effect(() => {
    const errors = this.apiErrors();
    if (!errors) return;
    for (const [field, messages] of Object.entries(errors)) {
      this.form.get(field.toLowerCase())?.setErrors({ apiError: messages[0] });
    }
  });

  // Getter de erro por campo (nunca lógica de validação no template)
  fieldError(name: keyof typeof this.form.controls): string | null {
    const ctrl = this.form.controls[name];
    if (!ctrl.touched || ctrl.valid) return null;
    if (ctrl.hasError('required'))  return 'Campo obrigatório.';
    if (ctrl.hasError('minlength')) return `Mínimo ${ctrl.getError('minlength').requiredLength} caracteres.`;
    if (ctrl.hasError('email'))     return 'Email inválido.';
    if (ctrl.hasError('min'))       return `Valor mínimo: ${ctrl.getError('min').min}.`;
    if (ctrl.hasError('apiError'))  return ctrl.getError('apiError') as string;
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submit.emit(this.form.getRawValue());
    this.form.reset();
  }
}
```

### Template obrigatório
```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <fieldset [disabled]="loading()">
    <div class="field">
      <label for="campo">Rótulo</label>
      <input id="campo" formControlName="campo"
             [attr.aria-invalid]="form.controls.campo.invalid && form.controls.campo.touched"
             aria-describedby="campo-error" />
      @if (fieldError('campo')) {
        <span id="campo-error" class="field-error" role="alert">{{ fieldError('campo') }}</span>
      }
    </div>
    <button type="submit">Salvar</button>
  </fieldset>
</form>
```

## Validações alinhadas ao backend

| Campo | Validators obrigatórios |
|-------|------------------------|
| `email` | `required`, `email` |
| `password` | `required`, `minLength(8)` |
| `firstName`/`lastName` | `required` |
| `name` (entidade) | `required`, `minLength(2)` |
| `sku` | `required`, `minLength(3)` |
| `price` | `required`, `min(0.01)` |
| `stock` | `required`, `min(0)` |

## Para campos de busca (debounce)
```ts
// No componente pai (page) — não no form
searchControl = new FormControl('');
ngOnInit() {
  this.searchControl.valueChanges.pipe(
    debounceTime(300), distinctUntilChanged(), takeUntilDestroyed()
  ).subscribe(v => this.store.setSearch(v ?? ''));
}
```

## Estilo (ver .ai/design/)
- Usar classes `.field` ou `.form-group`; tokens ERP em CSS: `var(--foreground)`, `var(--input-background)`, `var(--border)`.
- Botões: `.btn`, `.btn-primary`, `.btn-secondary`.
- Erros: `color-mix(in srgb, var(--error) 10%, transparent)` para fundos.

## Restrições
- `FormBuilder.nonNullable.group()` — obrigatório para campos com valor padrão.
- Sem `[(ngModel)]`.
- Sem lógica de validação no template (usar `fieldError()`).
- Sem chamada HTTP direta — emitir via `output` e deixar store/page tratar.
- POST: incluir `idempotencyKey: crypto.randomUUID()` na chamada do service.
