import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppModalComponent } from '../../../shared/components/modal.component';
import { PermissionsStore } from '../state/permissions.store';
import { AuthSessionService } from '../../../core/auth/auth-session.service';

@Component({
  selector: 'app-permissions-page',
  standalone: true,
  imports: [ReactiveFormsModule, AppModalComponent],
  templateUrl: './permissions.page.html',
  styleUrl: './permissions.page.css',
  providers: [PermissionsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsPage implements OnInit {
  protected readonly store = inject(PermissionsStore);
  protected readonly session = inject(AuthSessionService);
  private readonly fb = inject(FormBuilder);

  readonly vm = this.store.vm;
  readonly canManage =
    this.session.hasPermission('authorization.permission.manage') || this.session.isAdmin();
  readonly createModalOpen = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['']
  });

  readonly totalPages = () => Math.ceil(this.vm().totalCount / this.vm().pageSize) || 1;

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
    this.createModalOpen.set(false);
  }

  closeCreateModal(): void {
    this.form.reset();
    this.createModalOpen.set(false);
  }

  onRemove(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta permissão?')) {
      this.store.remove(id);
    }
  }

  onPageChange(page: number): void {
    this.store.setPage(page);
  }
}
