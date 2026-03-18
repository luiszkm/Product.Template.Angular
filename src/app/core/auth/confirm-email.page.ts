import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiClient } from '../api/api-client';
import { API_PATHS } from '../api/api-paths';

@Component({
  selector: 'app-confirm-email-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main style="min-height:100vh;display:grid;place-items:center;background:#f8fafc;">
      <section style="text-align:center;padding:2rem;max-width:24rem;">
        @if (loading()) {
          <p style="color:#64748b;">Confirmando e-mail, aguarde...</p>
        } @else if (success()) {
          <p style="color:#22c55e;font-weight:600;">E-mail confirmado com sucesso!</p>
          <a routerLink="/login" style="color:#3b82f6;text-decoration:underline;margin-top:1rem;display:inline-block;">
            Ir para o login
          </a>
        } @else {
          <p style="color:#ef4444;">{{ error() ?? 'Falha ao confirmar e-mail.' }}</p>
          <a routerLink="/login" style="color:#3b82f6;text-decoration:underline;margin-top:1rem;display:inline-block;">
            Voltar para o login
          </a>
        }
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmEmailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiClient);

  readonly loading = signal(true);
  readonly success = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading.set(false);
      this.error.set('Link inválido.');
      return;
    }

    this.api.post<void, object>(API_PATHS.identity.confirmEmail(id), {}).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.problem?.detail ?? 'Não foi possível confirmar o e-mail.');
      }
    });
  }
}
