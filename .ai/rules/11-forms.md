# Regra 11 — Formulários

## Estratégia obrigatória
- Usar **somente Reactive Forms** (`ReactiveFormsModule`).
- Proibido Template-driven forms (`FormsModule` com `ngModel`).
- Usar `FormBuilder.nonNullable.group()` para todos os formulários com campos obrigatórios.
- Tipagem explícita do formulário com `FormGroup<T>`.

## Padrão mínimo de formulário

```ts
@Component({ standalone: true, imports: [ReactiveFormsModule, ...] })
export class MyFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // emitir output ou chamar store
  }
}
```

## Validação alinhada com o backend (FluentValidation)

| Campo | Validadores mínimos no frontend |
|-------|---------------------------------|
| `email` | `Validators.required`, `Validators.email` |
| `password` | `Validators.required`, `Validators.minLength(8)` |
| `firstName` / `lastName` | `Validators.required` |
| `name` (produto) | `Validators.required`, `Validators.minLength(2)` |
| `sku` | `Validators.required`, `Validators.minLength(3)` |
| `price` | `Validators.required`, `Validators.min(0.01)` |
| `stock` | `Validators.required`, `Validators.min(0)` |

> ⚠️ A validação do frontend é UX — o backend **sempre** revalida. Nunca remover validação do backend.

## Mapeamento de erros da API no formulário

Erros `400 ValidationError` da API (`problem.errors`) devem ser mapeados nos campos:

```ts
// store ou page
handleApiError(apiError: ApiError, form: FormGroup): void {
  if (apiError.status === 400 && apiError.problem.errors) {
    for (const [field, messages] of Object.entries(apiError.problem.errors)) {
      const control = form.get(field.toLowerCase());
      if (control) {
        control.setErrors({ apiError: messages[0] });
      }
    }
    return;
  }
  if (apiError.status === 409) {
    form.get('email')?.setErrors({ apiError: 'Este email já está cadastrado.' });
    return;
  }
  // outros erros: propagar para o nível de página/toast
}
```

## Exibição de erros no template

**Nunca** colocar lógica de validação direta no template. Usar getter ou `computed()`:

```ts
// no componente
get emailError(): string | null {
  const ctrl = this.form.get('email');
  if (!ctrl?.touched || ctrl.valid) return null;
  if (ctrl.hasError('required')) return 'Email é obrigatório.';
  if (ctrl.hasError('email')) return 'Email inválido.';
  if (ctrl.hasError('apiError')) return ctrl.getError('apiError');
  return null;
}
```

```html
<!-- no template -->
@if (emailError) {
  <span class="field-error" role="alert">{{ emailError }}</span>
}
```

## Idempotência em submissões

Formulários de criação (POST) devem gerar `X-Idempotency-Key` na chamada:

```ts
// no service/store — já suportado pelo ApiClient
this.apiClient.post('/resource', body, { idempotencyKey: crypto.randomUUID() });
```

## Debounce em buscas

Campos de busca (search/filter) devem usar `debounceTime` antes de disparar requisições:

```ts
// no componente ou page
searchControl = new FormControl('');

ngOnInit() {
  this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    takeUntilDestroyed()
  ).subscribe(value => this.store.setSearch(value ?? ''));
}
```

## Reset após sucesso

Após submit com sucesso, resetar o formulário para o estado inicial:

```ts
this.form.reset({ name: '', sku: '', price: 0, stock: 0 });
```

## Formulários desabilitados durante loading

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <fieldset [disabled]="vm().loading">
    <!-- campos -->
    <button type="submit">Salvar</button>
  </fieldset>
</form>
```

## Antipadrões proibidos
- `[(ngModel)]` em standalone components — usar `formControlName`.
- Lógica de validação no template (`*ngIf="form.get('x').errors?.required"`).
- Chamar serviço HTTP diretamente no `onSubmit()` do componente — passar para store/page.
- Formulário sem `markAllAsTouched()` antes de validar.
- Campos opcionais sem `.nonNullable` quando têm valor padrão.

