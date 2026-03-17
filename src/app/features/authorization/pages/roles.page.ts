import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolesStore } from '../state/roles.store';
import { AuthSessionService } from '../../../core/auth/auth-session.service';

@Component({
  selector: 'app-roles-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './roles.page.html',
  styleUrl: './roles.page.css',
  providers: [RolesStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesPage implements OnInit {
  protected readonly store = inject(RolesStore);
  protected readonly session = inject(AuthSessionService);
  private readonly fb = inject(FormBuilder);

  readonly vm = this.store.vm;
  readonly canManage = this.session.hasPermission('authorization.role.manage') || this.session.isAdmin();
  readonly showCreateForm = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['']
  });

  readonly totalPages = () =>
    Math.ceil(this.vm().totalCount / this.vm().pageSize) || 1;

  ngOnInit(): void {
    this.store.load();
  }

  onCreate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.create(this.form.getRawValue());
    this.form.reset();
    this.showCreateForm.set(false);
  }

  onRemove(id: string): void {
    if (confirm('Tem certeza que deseja excluir este role?')) {
      this.store.remove(id);
    }
  }

  onPageChange(page: number): void {
    this.store.setPage(page);
  }
}
