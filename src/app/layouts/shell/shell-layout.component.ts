import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellLayoutComponent {}
