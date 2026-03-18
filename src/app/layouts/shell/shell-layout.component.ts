import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, Users, Shield, Key, Building2, Search, Sun, Moon, Bell, User, Menu, ChevronLeft, ChevronRight, ChevronDown, LogOut } from 'lucide-angular';
import { LanguageSelectorComponent } from '../../shared/components/language-selector.component';
import { AuthSessionService } from '../../core/auth/auth-session.service';
import { ThemeService } from '../../core/theme/theme.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LanguageSelectorComponent,
    TranslatePipe,
    LucideAngularModule
  ],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellLayoutComponent {
  protected readonly session = inject(AuthSessionService);
  protected readonly theme = inject(ThemeService);
  private readonly router = inject(Router);

  protected readonly sidebarOpen = signal(false);
  protected readonly notificationsOpen = signal(false);
  protected readonly sidebarCollapsed = signal(this.getInitialSidebarCollapsed());
  protected readonly authSubmenuOpen = signal(false);

  protected readonly icons = {
    LayoutDashboard,
    Users,
    Shield,
    Key,
    Building2,
    Search,
    Sun,
    Moon,
    Bell,
    User,
    Menu,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    LogOut
  };

  protected toggleAuthSubmenu(): void {
    this.authSubmenuOpen.update(v => !v);
  }

  protected isAuthRoute(): boolean {
    return this.router.url.includes('/roles') || this.router.url.includes('/permissions');
  }

  private getInitialSidebarCollapsed(): boolean {
    if (typeof localStorage === 'undefined') return false;
    try {
      return localStorage.getItem('sidebar-collapsed') === 'true';
    } catch {
      return false;
    }
  }

  protected toggleSidebarCollapsed(): void {
    this.sidebarCollapsed.update(v => !v);
    try {
      localStorage.setItem('sidebar-collapsed', String(this.sidebarCollapsed()));
    } catch {
      /* ignore */
    }
  }


  protected toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  protected logout(): void {
    this.session.logout();
    this.router.navigateByUrl('/login');
  }

  protected onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const term = input?.value?.trim();
    if (term) {
      this.router.navigate(['/users'], { queryParams: { search: term } });
      input.value = '';
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.notificationsOpen.set(false);
  }
}
