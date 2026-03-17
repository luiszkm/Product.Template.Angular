import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LanguageSelectorComponent } from '../../shared/components/language-selector.component';
import { AuthSessionService } from '../../core/auth/auth-session.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LanguageSelectorComponent, TranslatePipe],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellLayoutComponent {
  protected readonly session = inject(AuthSessionService);
  private readonly router = inject(Router);

  protected logout(): void {
    this.session.logout();
    this.router.navigateByUrl('/login');
  }
}
