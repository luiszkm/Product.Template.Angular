import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiClient } from '../api/api-client';
import { API_PATHS } from '../api/api-paths';
import { ApiError } from '../api/api-types';

export interface UserOutput {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPage {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiClient);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly globalError = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]]
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

  get firstNameError(): string | null {
    const ctrl = this.form.controls.firstName;
    if (!ctrl.touched || ctrl.valid) return null;
    if (ctrl.hasError('required')) return 'Nome é obrigatório.';
    return null;
  }

  get lastNameError(): string | null {
    const ctrl = this.form.controls.lastName;
    if (!ctrl.touched || ctrl.valid) return null;
    if (ctrl.hasError('required')) return 'Sobrenome é obrigatório.';
    return null;
  }

  onSubmit(): void {
    this.globalError.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { email, password, firstName, lastName } = this.form.getRawValue();

    this.api
      .post<UserOutput, { email: string; password: string; firstName: string; lastName: string }>(
        API_PATHS.identity.register,
        { email, password, firstName, lastName }
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        },
        error: (apiError: ApiError) => {
          this.loading.set(false);
          this.handleRegisterError(apiError);
        }
      });
  }

  private handleRegisterError(apiError: ApiError): void {
    if (apiError.status === 400 && apiError.problem.errors) {
      const errors = apiError.problem.errors;
      if (errors['email']) {
        this.form.controls.email.setErrors({ apiError: errors['email'][0] });
      }
      if (errors['password']) {
        this.form.controls.password.setErrors({ apiError: errors['password'][0] });
      }
      if (errors['firstName']) {
        this.form.controls.firstName.setErrors({ apiError: errors['firstName'][0] });
      }
      if (errors['lastName']) {
        this.form.controls.lastName.setErrors({ apiError: errors['lastName'][0] });
      }
      return;
    }

    if (apiError.status === 409) {
      this.form.controls.email.setErrors({ apiError: apiError.problem.detail ?? 'E-mail já cadastrado.' });
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
