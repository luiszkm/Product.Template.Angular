import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersStore } from '../state/users.store';
import { UsersTableComponent } from '../components/users-table.component';
import { AuthSessionService } from '../../../core/auth/auth-session.service';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './users.page.html',
  styleUrl: './users.page.css',
  providers: [UsersStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPage implements OnInit {
  protected readonly store = inject(UsersStore);
  protected readonly session = inject(AuthSessionService);
  private readonly route = inject(ActivatedRoute);

  readonly vm = this.store.vm;

  readonly canManage = this.session.hasPermission('identity.user.manage') || this.session.isAdmin();

  readonly totalPages = computed(() => {
    const v = this.vm();
    return Math.ceil(v.totalCount / v.pageSize) || 1;
  });

  ngOnInit(): void {
    const search = this.route.snapshot.queryParamMap.get('search');
    if (search) {
      this.store.setSearch(search);
    }
    this.store.load();
  }

  onSearch(term: string): void {
    this.store.setSearch(term);
    this.store.load();
  }


  onPageChange(page: number): void {
    this.store.setPage(page);
  }

  onRemove(id: string): void {
    if (confirm('Tem certeza que deseja excluir este usuário? A conta será desativada.')) {
      this.store.remove(id);
    }
  }
}
