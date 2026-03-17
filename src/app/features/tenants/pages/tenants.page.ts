import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TenantsStore } from '../state/tenants.store';
import { AuthSessionService } from '../../../core/auth/auth-session.service';

@Component({
  selector: 'app-tenants-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './tenants.page.html',
  styleUrl: './tenants.page.css',
  providers: [TenantsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantsPage implements OnInit {
  protected readonly store = inject(TenantsStore);
  protected readonly session = inject(AuthSessionService);
  private readonly fb = inject(FormBuilder);

  readonly vm = this.store.vm;
  readonly canManage = this.session.hasPermission('tenants.manage') || this.session.isAdmin();
  readonly showCreateForm = signal(false);

  readonly isolationModes = ['SharedDb', 'SchemaPerTenant', 'DedicatedDb'] as const;

  readonly form = this.fb.nonNullable.group({
    tenantId: [0, [Validators.required, Validators.min(1)]],
    tenantKey: ['', [Validators.required]],
    displayName: ['', [Validators.required]],
    contactEmail: [''],
    isolationMode: ['SharedDb' as const, [Validators.required]]
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
    const value = this.form.getRawValue();
    this.store.create({
      tenantId: value.tenantId,
      tenantKey: value.tenantKey,
      displayName: value.displayName,
      contactEmail: value.contactEmail || undefined,
      isolationMode: value.isolationMode
    });
    this.form.reset({ tenantId: 0, tenantKey: '', displayName: '', contactEmail: '', isolationMode: 'SharedDb' });
    this.showCreateForm.set(false);
  }

  onRemove(id: number): void {
    if (confirm('Tem certeza que deseja desativar este tenant? Os dados não serão removidos.')) {
      this.store.remove(id);
    }
  }

  onPageChange(page: number): void {
    this.store.setPage(page);
  }
}
