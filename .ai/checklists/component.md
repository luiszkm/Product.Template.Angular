# Checklist — Componente Angular

## Estrutura TypeScript
- [ ] `standalone: true`
- [ ] `ChangeDetectionStrategy.OnPush`
- [ ] `inject()` usado — nunca `constructor(private ...)`
- [ ] Inputs signal-based: `input()` / `input.required()` (Angular 17+)
- [ ] Outputs signal-based: `output<Tipo>()`
- [ ] Computações de view em `computed()` — nunca no template
- [ ] Side-effects em `effect()` (ex: aplicar `apiErrors` nos controles)
- [ ] Sem `any` — tipagem explícita em tudo

## Template
- [ ] Sem lógica de negócio no HTML
- [ ] `@if` / `@else` no lugar de `*ngIf`
- [ ] `@for (item of items(); track item.id)` no lugar de `*ngFor`
- [ ] `@switch` no lugar de múltiplos `*ngIf` encadeados
- [ ] Pipes importados explicitamente no `imports[]`: `DecimalPipe`, `DatePipe`, `CurrencyPipe`

## Formulários (se aplicável)
- [ ] `FormBuilder.nonNullable.group()` para campos obrigatórios
- [ ] `apiErrors = input<Record<string, string[]> | null>(null)` para erros da API
- [ ] `effect()` que aplica `apiErrors` nos controles
- [ ] `fieldError(name)` getter — lógica de validação fora do template
- [ ] `<fieldset [disabled]="loading()">` durante operações
- [ ] `markAllAsTouched()` no submit inválido

## Acessibilidade
- [ ] `aria-invalid`, `aria-describedby`, `role="alert"` em campos com erro
- [ ] `type="button"` em botões não-submit
- [ ] `aria-label` descritivo em botões de ação

## Qualidade
- [ ] Spec criado (`*.spec.ts`) com `TestBed.configureTestingModule`
- [ ] Spec cobre: cria, emite output válido, não emite com inválido
- [ ] Nenhum import desnecessário no `imports[]` do componente
