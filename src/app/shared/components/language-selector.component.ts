import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex gap-2">
      @for (locale of i18n.availableLocales; track locale.code) {
        <button
          (click)="i18n.setLocale(locale.code)"
          [class.bg-primary-600]="i18n.currentLocale() === locale.code"
          [class.text-white]="i18n.currentLocale() === locale.code"
          [class.bg-gray-100]="i18n.currentLocale() !== locale.code"
          [class.text-gray-700]="i18n.currentLocale() !== locale.code"
          [class.hover:bg-primary-700]="i18n.currentLocale() === locale.code"
          [class.hover:bg-gray-200]="i18n.currentLocale() !== locale.code"
          class="px-3 py-1.5 rounded-md transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                 flex items-center gap-2 text-sm font-medium"
          [attr.aria-label]="'Mudar idioma para ' + locale.label"
          [attr.aria-current]="i18n.currentLocale() === locale.code ? 'true' : null">
          <span class="text-lg" role="img" [attr.aria-label]="locale.label">{{ locale.flag }}</span>
          <span>{{ locale.label }}</span>
        </button>
      }
    </div>
  `
})
export class LanguageSelectorComponent {
  readonly i18n = inject(I18nService);
}

