import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ApiClient } from '../api/api-client';
import { API_PATHS } from '../api/api-paths';
import { ApiError } from '../api/api-types';
import { AuthSessionService, LoginResponse } from './auth-session.service';
import { APP_SETTINGS } from '../config/app-settings.token';

interface ProvidersResponse {
  providers: string[];
  count: number;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiClient);
  private readonly session = inject(AuthSessionService);
  private readonly router = inject(Router);
  private readonly settings = inject(APP_SETTINGS);

  readonly providers = signal<string[]>([]);
  readonly loading = signal(false);
  readonly globalError = signal<string | null>(null);
  readonly rateLimitSeconds = signal<number | null>(null);

  readonly hasMicrosoft = computed(() => this.providers().includes('microsoft'));

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  get emailError(): string | null {
    const ctrl = this.form.controls.email;
    if (!ctrl.touched || ctrl.valid) return null;
    if (ctrl.hasError('required')) return 'Email é obrigatório.';
    if (ctrl.hasError('email')) return 'Informe um email válido.';
    if (ctrl.hasError('apiError')) return ctrl.getError('apiError') as string;
    return null;
  }

  get passwordError(): string | null {
    const ctrl = this.form.controls.password;
    if (!ctrl.touched || ctrl.valid) return null;
    if (ctrl.hasError('required')) return 'Senha é obrigatória.';
    if (ctrl.hasError('minlength')) return 'A senha deve ter pelo menos 8 caracteres.';
    if (ctrl.hasError('apiError')) return ctrl.getError('apiError') as string;
    return null;
  }

  ngOnInit(): void {
    this.api.get<ProvidersResponse>(API_PATHS.identity.providers).subscribe({
      next: (res) => this.providers.set(res.providers),
      error: () => { /* falha silenciosa — exibe apenas formulário local */ }
    });
  }

  onSubmit(): void {
    this.globalError.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { email, password } = this.form.getRawValue();

    this.api
      .post<LoginResponse, { email: string; password: string }>(
        API_PATHS.identity.login,
        { email, password }
      )
      .subscribe({
        next: (response) => {
          this.session.setSession(response);
          this.router.navigateByUrl('/');
        },
        error: (apiError: ApiError) => {
          this.loading.set(false);
          this.handleLoginError(apiError);
        }
      });
  }

  onMicrosoftLogin(): void {
    // Redireciona para o backend que inicia o fluxo OAuth com o Azure AD
    const redirectUri = encodeURIComponent(this.settings.oauthRedirectUri);
    const authBase = this.settings.apiUrl.replace(/\/api\/?$/, '');
    window.location.href = `${authBase}/auth/microsoft?redirectUri=${redirectUri}`;
  }

  private handleLoginError(apiError: ApiError): void {
    if (apiError.status === 400 && apiError.problem.errors) {
      const errors = apiError.problem.errors;
      if (errors['email']) {
        this.form.controls.email.setErrors({ apiError: errors['email'][0] });
      }
      if (errors['password']) {
        this.form.controls.password.setErrors({ apiError: errors['password'][0] });
      }
      return;
    }

    if (apiError.status === 401) {
      this.globalError.set('Email ou senha incorretos.');
      return;
    }

    if (apiError.status === 429) {
      const seconds = apiError.retryAfterSeconds ?? 60;
      this.rateLimitSeconds.set(seconds);
      this.globalError.set(`Muitas tentativas. Aguarde ${seconds} segundos antes de tentar novamente.`);
      return;
    }

    const id = apiError.correlationId;
    this.globalError.set(
      id
        ? `Erro inesperado. Contate o suporte informando o ID: ${id}`
        : 'Erro inesperado. Tente novamente mais tarde.'
    );
  }
}
