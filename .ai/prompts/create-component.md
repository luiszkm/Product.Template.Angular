# Prompt AI — Criar Componente Reutilizável

## Objetivo
Gerar componente standalone reutilizável de alta qualidade, pronto para uso em qualquer feature.

## Entrada esperada
- Nome do componente (ex: `user-avatar`, `status-badge`).
- Inputs e outputs necessários.
- Comportamento esperado.

## Instruções para o agente

### Arquivos a criar
- `{name}.component.ts`
- `{name}.component.html`
- `{name}.component.css`
- `{name}.component.spec.ts`

### Regras obrigatórias
1. `standalone: true` + `ChangeDetectionStrategy.OnPush`.
2. Usar **signal-based APIs**: `input()`, `input.required()`, `output()` (Angular 17+).
3. Usar `inject()` — nunca `constructor(private ...)`.
4. Computações de view em `computed()`, nunca no template.
5. Listas com `@for (item of items(); track item.id)`.
6. Sem `any`; tipagem explícita em todos os inputs/outputs.
7. Sem lógica de negócio no template.
8. Acessibilidade: `<label for>`, `aria-invalid`, `aria-describedby`, `role="alert"` em erros.
9. Se aceitar erros de API: adicionar `apiErrors = input<Record<string, string[]> | null>(null)` + `effect()` para aplicar nos controles.
10. Importar pipes necessários explicitamente (`DecimalPipe`, `DatePipe`, `CurrencyPipe`).

### Spec obrigatório (TestBed)
```ts
describe('NomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomeComponent]
    }).compileComponents();
  });

  it('deve criar', () => { expect(fixture.componentInstance).toBeTruthy(); });
  it('deve emitir output com dados válidos', () => { /* ... */ });
  it('não deve emitir com dados inválidos', () => { /* ... */ });
});
```

## Saída obrigatória
- Código TypeScript/HTML/CSS compilável.
- Spec com pelo menos 3 casos: criação, output válido, output inválido.
- Instrução de uso no template pai (1 linha de exemplo).
