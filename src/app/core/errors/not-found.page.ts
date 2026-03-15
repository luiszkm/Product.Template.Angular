import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main style="min-height:100vh;display:grid;place-items:center;background:#f8fafc;">
      <section style="text-align:center;padding:2rem;">
        <h1 style="font-size:4rem;font-weight:700;color:#94a3b8;">404</h1>
        <h2 style="font-size:1.25rem;font-weight:600;margin-bottom:0.5rem;">Página não encontrada</h2>
        <p style="color:#64748b;margin-bottom:1.5rem;">
          O recurso que você procura não existe ou foi removido.
        </p>
        <a routerLink="/" style="color:#3b82f6;text-decoration:underline;">
          Voltar para o início
        </a>
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPage {}

