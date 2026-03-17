import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
  signal
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TenantsService } from '../services/tenants.service';
import { AuthSessionService } from '../../../core/auth/auth-session.service';

@Component({
  selector: 'app-tenant-detail-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, DatePipe],
  templateUrl: './tenant-detail.page.html',
  styleUrl: './tenant-detail.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantDetailPage implements OnInit {
  private readonly tenantsService = inject(TenantsService);
  private readonly session = inject(AuthSessionService);
  private readonly fb = inject(FormBuilder);

  id = input.required<string>();

  readonly tenant = signal<import('../../../core/api/tenants.types').TenantOutput | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly canManage = this.session.hasPermission('tenants.manage') || this.session.isAdmin();
  readonly editing = signal(false);

  readonly form = this.fb.nonNullable.group({
    displayName: ['', [Validators.required]],
    contactEmail: ['']
  });

  ngOnInit(): void {
    const id = this.id();
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
      this.loading.set(false);
      this.error.set('ID inválido.');
      return;
    }
    this.tenantsService.get(numId).subscribe({
      next: (t) => {
        this.tenant.set(t);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.problem?.detail ?? 'Erro ao carregar tenant.');
      }
    });
  }

  startEdit(): void {
    const t = this.tenant();
    if (t) {
      this.form.patchValue({ displayName: t.displayName, contactEmail: t.contactEmail ?? '' });
      this.editing.set(true);
    }
  }

  cancelEdit(): void {
    this.editing.set(false);
  }

  saveEdit(): void {
    if (this.form.invalid) return;
    const id = parseInt(this.id(), 10);
    const { displayName, contactEmail } = this.form.getRawValue();
    this.tenantsService.update(id, { tenantId: id, displayName, contactEmail: contactEmail || undefined }).subscribe({
      next: (t) => {
        this.tenant.set(t);
        this.editing.set(false);
      }
    });
  }

  onRemove(): void {
    if (confirm('Tem certeza que deseja desativar este tenant? Os dados não serão removidos.')) {
      const id = parseInt(this.id(), 10);
      this.tenantsService.remove(id).subscribe({
        next: () => {
          this.tenant.update((t) => (t ? { ...t, isActive: false } : null));
        }
      });
    }
  }
}
