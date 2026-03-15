import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users-page',
  standalone: true,
  template: `
    <section>
      <h2>Users</h2>
      <p>Placeholder para feature users (lazy loaded).</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPage {}
