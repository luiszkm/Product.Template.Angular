#!/usr/bin/env node

/**
 * Code Review Automation Script
 *
 * Valida arquivos TypeScript contra as 16 regras do Product Template Angular.
 *
 * Uso:
 *   node scripts/code-review.js <arquivo.ts>
 *   node scripts/code-review.js src/app/features/products/**\/*.ts
 */

const fs = require('fs');
const path = require('path');

// Cores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class CodeReviewer {
  constructor(filePath) {
    this.filePath = filePath;
    this.content = fs.readFileSync(filePath, 'utf-8');
    this.lines = this.content.split('\n');
    this.issues = [];
    this.score = 0;
    this.maxScore = 0;
  }

  review() {
    console.log(`\n${colors.cyan}🔍 Reviewing: ${this.filePath}${colors.reset}\n`);

    this.checkGlobalRules();
    this.checkComponents();
    this.checkServices();
    this.checkStores();
    this.checkForms();
    this.checkTailwind();
    this.checkI18n();
    this.checkDarkMode();
    this.checkTypeScript();

    this.printReport();
  }

  addIssue(severity, line, message, rule) {
    this.issues.push({ severity, line, message, rule });
  }

  checkRule(condition, points, severity, line, message, rule) {
    this.maxScore += points;
    if (condition) {
      this.score += points;
    } else {
      this.addIssue(severity, line, message, rule);
    }
  }

  checkGlobalRules() {
    // Sem any
    this.lines.forEach((line, idx) => {
      if (line.includes(': any') || line.includes('<any>')) {
        this.addIssue('CRÍTICO', idx + 1, 'Uso de "any" detectado', '00-global.md');
      }
    });

    // Sem constructor(private ...)
    const hasConstructorPrivate = this.content.includes('constructor(private');
    this.checkRule(
      !hasConstructorPrivate,
      5,
      'CRÍTICO',
      this.findLine('constructor(private'),
      'Usar inject() ao invés de constructor(private ...)',
      '00-global.md'
    );

    // Sem *ngIf, *ngFor
    const hasOldDirectives = this.content.includes('*ngIf') || this.content.includes('*ngFor');
    this.checkRule(
      !hasOldDirectives,
      5,
      'CRÍTICO',
      this.findLine('*ng'),
      'Usar @if/@for ao invés de *ngIf/*ngFor',
      '03-components.md'
    );

    // Sem [(ngModel)]
    const hasNgModel = this.content.includes('[(ngModel)]');
    this.checkRule(
      !hasNgModel,
      5,
      'CRÍTICO',
      this.findLine('[(ngModel)]'),
      'Proibido usar [(ngModel)]. Use Reactive Forms',
      '11-forms.md'
    );
  }

  checkComponents() {
    if (!this.content.includes('@Component')) return;

    // standalone: true
    const hasStandalone = this.content.includes('standalone: true');
    this.checkRule(
      hasStandalone,
      5,
      'CRÍTICO',
      this.findLine('@Component'),
      'Component deve ter standalone: true',
      '03-components.md'
    );

    // OnPush
    const hasOnPush = this.content.includes('ChangeDetectionStrategy.OnPush');
    this.checkRule(
      hasOnPush,
      5,
      'ALTO',
      this.findLine('@Component'),
      'Component deve usar ChangeDetectionStrategy.OnPush',
      '03-components.md'
    );

    // Sem @Input/@Output
    const hasOldInputOutput = this.content.includes('@Input()') || this.content.includes('@Output()');
    this.checkRule(
      !hasOldInputOutput,
      5,
      'ALTO',
      this.findLine('@Input()') || this.findLine('@Output()'),
      'Usar input()/output() signal-based ao invés de @Input()/@Output()',
      '03-components.md'
    );
  }

  checkServices() {
    if (!this.content.includes('@Injectable')) return;
    if (this.filePath.includes('.store.ts')) return; // Pular stores

    // providedIn: 'root'
    const hasProvidedIn = this.content.includes("providedIn: 'root'");
    this.checkRule(
      hasProvidedIn,
      3,
      'MÉDIO',
      this.findLine('@Injectable'),
      'Service deve ter providedIn: "root"',
      '04-services.md'
    );

    // Usar ApiClient (não HttpClient direto)
    const usesHttpClient = this.content.includes('HttpClient') && !this.content.includes('ApiClient');
    this.checkRule(
      !usesHttpClient,
      5,
      'ALTO',
      this.findLine('HttpClient'),
      'Usar ApiClient ao invés de HttpClient direto',
      '04-services.md'
    );
  }

  checkStores() {
    if (!this.filePath.includes('.store.ts')) return;

    // Signal para estado
    const hasSignals = this.content.includes('signal<');
    this.checkRule(
      hasSignals,
      5,
      'ALTO',
      this.findLine('export class'),
      'Store deve usar signals para estado',
      '05-state.md'
    );

    // validationErrors
    const hasValidationErrors = this.content.includes('validationErrors');
    this.checkRule(
      hasValidationErrors,
      5,
      'ALTO',
      this.findLine('export class'),
      'Store deve ter signal validationErrors',
      '05-state.md'
    );

    // ViewModel computed
    const hasViewModel = this.content.includes('vm = computed(');
    this.checkRule(
      hasViewModel,
      3,
      'MÉDIO',
      this.findLine('export class'),
      'Store deve ter ViewModel (vm = computed(...))',
      '05-state.md'
    );
  }

  checkForms() {
    if (!this.content.includes('FormGroup') && !this.content.includes('FormBuilder')) return;

    // nonNullable
    const hasNonNullable = this.content.includes('.nonNullable.');
    this.checkRule(
      hasNonNullable,
      3,
      'MÉDIO',
      this.findLine('group('),
      'Usar fb.nonNullable.group() ao invés de fb.group()',
      '11-forms.md'
    );

    // apiErrors input
    const hasApiErrors = this.content.includes('apiErrors') && this.content.includes('input<');
    this.checkRule(
      hasApiErrors,
      5,
      'ALTO',
      this.findLine('export class'),
      'Form component deve ter apiErrors input',
      '11-forms.md'
    );

    // fieldError() getter
    const hasFieldError = this.content.includes('fieldError(');
    this.checkRule(
      hasFieldError,
      3,
      'MÉDIO',
      this.findLine('export class'),
      'Form component deve ter fieldError() getter',
      '11-forms.md'
    );
  }

  checkTailwind() {
    if (!this.content.includes('class=')) return;

    // Sem style inline
    const hasStyleInline = this.content.includes('style="');
    this.checkRule(
      !hasStyleInline,
      5,
      'ALTO',
      this.findLine('style="'),
      'Proibido CSS inline. Usar Tailwind classes',
      '14-tailwind.md'
    );
  }

  checkI18n() {
    // Detectar texto hardcoded em templates (heurística simples)
    const templateMatch = this.content.match(/template:\s*`([^`]+)`/s);
    if (templateMatch) {
      const template = templateMatch[1];

      // Buscar textos em português/inglês que não estão em translate pipe
      const hardcodedTexts = template.match(/>([A-ZÁÉÍÓÚÀÂÊÔÃÕÇÑ][a-záéíóúàâêôãõçñ\s]{3,})</g);
      if (hardcodedTexts && !template.includes('| translate')) {
        this.addIssue(
          'ALTO',
          this.findLine(hardcodedTexts[0]),
          'Possível texto hardcoded detectado. Usar {{ \'key\' | translate }}',
          '15-i18n.md'
        );
      }
    }
  }

  checkDarkMode() {
    if (!this.content.includes('class=')) return;

    // Verificar se tem classes de cor sem dark:
    const hasColorClasses = /class="[^"]*bg-(white|gray|slate|zinc)/g.test(this.content);
    const hasDarkClasses = /dark:bg-/g.test(this.content);

    if (hasColorClasses && !hasDarkClasses) {
      this.checkRule(
        false,
        3,
        'MÉDIO',
        this.findLine('bg-white') || this.findLine('bg-gray'),
        'Classes de cor sem suporte dark mode. Adicionar classes dark:',
        '16-darktheme.md'
      );
    } else {
      this.maxScore += 3;
      this.score += 3;
    }
  }

  checkTypeScript() {
    // Interfaces/types para objetos complexos
    const hasInterfaces = this.content.includes('interface ') || this.content.includes('type ');
    if (this.content.length > 500 && !hasInterfaces) {
      this.addIssue(
        'BAIXO',
        1,
        'Considere criar interfaces/types para melhor tipagem',
        '07-style.md'
      );
    }
  }

  findLine(text) {
    const idx = this.lines.findIndex(line => line.includes(text));
    return idx >= 0 ? idx + 1 : 0;
  }

  printReport() {
    console.log(`${colors.blue}═══════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.blue}  CODE REVIEW REPORT${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════${colors.reset}\n`);

    // Score
    const percentage = this.maxScore > 0 ? Math.round((this.score / this.maxScore) * 100) : 100;
    const scoreColor = percentage >= 80 ? colors.green : percentage >= 60 ? colors.yellow : colors.red;

    console.log(`${scoreColor}Score: ${this.score}/${this.maxScore} (${percentage}%)${colors.reset}\n`);

    // Issues por severidade
    const critical = this.issues.filter(i => i.severity === 'CRÍTICO');
    const high = this.issues.filter(i => i.severity === 'ALTO');
    const medium = this.issues.filter(i => i.severity === 'MÉDIO');
    const low = this.issues.filter(i => i.severity === 'BAIXO');

    if (this.issues.length === 0) {
      console.log(`${colors.green}✅ Nenhum problema encontrado!${colors.reset}\n`);
    } else {
      console.log(`${colors.yellow}📋 Problemas Encontrados: ${this.issues.length}${colors.reset}\n`);

      this.printIssues('🔴 CRÍTICO', critical, colors.red);
      this.printIssues('🟠 ALTO', high, colors.yellow);
      this.printIssues('🟡 MÉDIO', medium, colors.blue);
      this.printIssues('🟢 BAIXO', low, colors.cyan);
    }

    // Status final
    console.log(`${colors.blue}═══════════════════════════════════════════${colors.reset}\n`);

    if (critical.length > 0) {
      console.log(`${colors.red}❌ REPROVADO — Corrigir problemas críticos antes de merge${colors.reset}\n`);
      process.exit(1);
    } else if (percentage < 60) {
      console.log(`${colors.red}❌ REPROVADO — Score abaixo de 60%${colors.reset}\n`);
      process.exit(1);
    } else if (percentage < 80) {
      console.log(`${colors.yellow}⚠️  APROVADO COM RESSALVAS — Considere melhorias${colors.reset}\n`);
    } else {
      console.log(`${colors.green}✅ APROVADO — Código em conformidade com os padrões${colors.reset}\n`);
    }
  }

  printIssues(title, issues, color) {
    if (issues.length === 0) return;

    console.log(`${color}${title} (${issues.length})${colors.reset}`);
    issues.forEach(issue => {
      console.log(`  Linha ${issue.line}: ${issue.message}`);
      console.log(`  ${colors.cyan}→ Regra: .ai/rules/${issue.rule}${colors.reset}\n`);
    });
  }
}

// Main
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Uso: node scripts/code-review.js <arquivo.ts>');
    process.exit(1);
  }

  const filePath = args[0];

  if (!fs.existsSync(filePath)) {
    console.error(`${colors.red}Erro: Arquivo não encontrado: ${filePath}${colors.reset}`);
    process.exit(1);
  }

  const reviewer = new CodeReviewer(filePath);
  reviewer.review();
}

main();

