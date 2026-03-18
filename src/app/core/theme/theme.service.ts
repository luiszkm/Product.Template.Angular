import { Injectable, signal, computed } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'app-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<Theme>(this.getInitialTheme());

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  toggle(): void {
    const next = this._theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
    this.applyToDocument(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }

  private getInitialTheme(): Theme {
    if (typeof document === 'undefined') return 'light';
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      /* ignore */
    }
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  private applyToDocument(theme: Theme): void {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  /** Call on app init to apply stored/preferred theme before first paint */
  init(): void {
    this.applyToDocument(this._theme());
  }
}
