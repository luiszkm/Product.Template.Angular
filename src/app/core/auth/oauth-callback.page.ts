import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClient } from '../api/api-client';
import { AuthSessionService, LoginResponse } from './auth-session.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-oauth-callback-page',
  standalone: true,
  template: `
    <main style="min-height:100vh;display:grid;place-items:center;background:#f8fafc;">
      <section style="text-align:center;padding:2rem;">
        @if (error()) {
          <p style="color:#ef4444;">{{ error() }}</p>
          <a href="/login" style="color:#3b82f6;text-decoration:underline;">Voltar para o login</a>
        } @else {
          <p style="color:#64748b;">Autenticando, aguarde...</p>
        }
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OAuthCallbackPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiClient);
  private readonly session = inject(AuthSessionService);

  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    const code = params.get('code');
    const oauthError = params.get('error');

    if (oauthError || !code) {
      this.error.set('Autenticação cancelada ou inválida. Tente novamente.');
      return;
    }

    this.api
      .post<LoginResponse, { provider: string; code: string; redirectUri: string }>(
        '/identity/external-login',
        { provider: 'microsoft', code, redirectUri: environment.oauthRedirectUri }
      )
      .subscribe({
        next: (response) => {
          this.session.setSession(response);
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.error.set('Falha na autenticação com Microsoft. Tente novamente.');
        }
      });
  }
}

