import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select
      class="language-selector"
      [ngModel]="i18n.currentLocale()"
      (ngModelChange)="onLocaleChange($event)"
      [attr.aria-label]="'Selecionar idioma'"
    >
      @for (locale of i18n.availableLocales; track locale.code) {
        <option [value]="locale.code">{{ locale.flag }} {{ locale.label }}</option>
      }
    </select>
  `,
  styles: `
    .language-selector {
      padding: var(--spacing-1) 1.75rem var(--spacing-1) var(--spacing-1);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--foreground);
      background-color: var(--background);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.5rem center;
      transition: border-color var(--transition-fast);
    }

    .language-selector:hover,
    .language-selector:focus {
      border-color: var(--neutral-400);
      outline: none;
    }

    .language-selector:focus-visible {
      box-shadow: 0 0 0 2px var(--focus-ring-color);
    }
  `
})
export class LanguageSelectorComponent {
  readonly i18n = inject(I18nService);

  protected onLocaleChange(code: string): void {
    if (code) {
      this.i18n.setLocale(code);
    }
  }
}

