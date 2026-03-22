import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';
import { API_BASE_URL } from './core/api/api.config';
import { APP_SETTINGS } from './core/config/app-settings.token';

const testSettings = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  tenantSlug: 'public',
  oauthRedirectUri: 'http://localhost:4200/auth/callback'
} as const;

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: APP_SETTINGS, useValue: testSettings },
        { provide: API_BASE_URL, useValue: testSettings.apiUrl }
      ]
    }).compileComponents();
  });

  it('deve criar o componente raiz', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar o router-outlet', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
