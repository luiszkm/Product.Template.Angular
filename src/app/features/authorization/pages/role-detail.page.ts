import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
  signal,
  computed
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RoleDetailStore } from '../state/role-detail.store';
import { AuthSessionService } from '../../../core/auth/auth-session.service';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-role-detail-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './role-detail.page.html',
  styleUrl: './role-detail.page.css',
  providers: [RoleDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDetailPage implements OnInit {
  private readonly store = inject(RoleDetailStore);
  private readonly session = inject(AuthSessionService);
  private readonly rolesService = inject(RolesService);
  private readonly fb = inject(FormBuilder);

  id = input.required<string>();

  readonly vm = this.store.vm;
  readonly canManage = this.session.hasPermission('authorization.role.manage') || this.session.isAdmin();
  readonly editing = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['']
  });

  readonly availablePermissions = computed(() => {
    const role = this.vm().role;
    const all = this.vm().allPermissions;
    if (!role || !all.length) return [];
    const currentIds = new Set(role.permissions.map((p) => p.id));
    return all.filter((p) => !currentIds.has(p.id));
  });

  ngOnInit(): void {
    const id = this.id();
    this.store.load(id);
    if (this.canManage) {
      this.store.loadAllPermissions();
    }
  }

  startEdit(): void {
    const role = this.vm().role;
    if (role) {
      this.form.patchValue({ name: role.name, description: role.description });
      this.editing.set(true);
    }
  }

  cancelEdit(): void {
    this.editing.set(false);
  }

  saveEdit(): void {
    if (this.form.invalid) return;
    const id = this.id();
    const { name, description } = this.form.getRawValue();
    this.rolesService
      .update(id, { roleId: id, name, description })
      .subscribe({
        next: (r) => {
          this.store.load(id);
          this.editing.set(false);
        }
      });
  }

  onPermissionSelect(permissionId: string): void {
    if (permissionId) {
      this.store.addPermission(this.id(), permissionId);
    }
  }

  onAddPermission(permissionId: string): void {
    this.store.addPermission(this.id(), permissionId);
  }

  onRemovePermission(permissionId: string): void {
    this.store.removePermission(this.id(), permissionId);
  }

  onRemove(): void {
    if (confirm('Tem certeza que deseja excluir este role?')) {
      this.store.remove(this.id());
    }
  }
}
