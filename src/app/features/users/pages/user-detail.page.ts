import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
  signal,
  computed
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserDetailStore } from '../state/user-detail.store';
import { AuthSessionService } from '../../../core/auth/auth-session.service';

@Component({
  selector: 'app-user-detail-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, DatePipe],
  templateUrl: './user-detail.page.html',
  styleUrl: './user-detail.page.css',
  providers: [UserDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailPage implements OnInit {
  private readonly store = inject(UserDetailStore);
  private readonly session = inject(AuthSessionService);
  private readonly fb = inject(FormBuilder);

  id = input.required<string>();

  readonly vm = this.store.vm;

  readonly canManage = this.session.hasPermission('identity.user.manage') || this.session.isAdmin();

  readonly canViewRoles =
    this.session.hasPermission('authorization.role.read') || this.session.isAdmin();

  readonly canManageRoles =
    this.session.hasPermission('authorization.role.manage') || this.session.isAdmin();

  readonly canEdit = computed(() => {
    const user = this.store.vm().user;
    if (!user) return false;
    return this.canManage || this.session.userId() === user.id;
  });

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]]
  });

  readonly editing = signal(false);

  readonly availableRoles = computed(() => {
    const v = this.store.vm();
    const currentIds = new Set(v.roles.map((r) => r.id));
    return (v.allRoles ?? []).filter((r) => !currentIds.has(r.id));
  });

  ngOnInit(): void {
    const id = this.id();
    this.store.load(id);
    if (this.canViewRoles) {
      this.store.loadRoles(id);
    }
    if (this.canManageRoles) {
      this.store.loadAllRoles();
    }
  }

  onAddRole(roleId: string): void {
    if (roleId) {
      this.store.addRole(this.id(), roleId);
    }
  }

  onRemoveRole(roleId: string): void {
    this.store.removeRole(this.id(), roleId);
  }

  startEdit(): void {
    const user = this.vm().user;
    if (user) {
      this.form.patchValue({ firstName: user.firstName, lastName: user.lastName });
      this.editing.set(true);
    }
  }

  cancelEdit(): void {
    this.editing.set(false);
  }

  saveEdit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const id = this.id();
    const { firstName, lastName } = this.form.getRawValue();
    this.store.update(id, { firstName, lastName });
    this.editing.set(false);
  }

  onRemove(): void {
    if (confirm('Tem certeza que deseja excluir este usuário? A conta será desativada.')) {
      this.store.remove(this.id());
    }
  }

  fieldError(field: string): string | null {
    const errors = this.vm().validationErrors;
    if (!errors || !errors[field]) return null;
    return errors[field][0] ?? null;
  }
}
