import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserOutput } from '../../../core/api/identity.types';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="table-wrapper">
      @if (loading()) {
        <p aria-live="polite">Carregando usuários...</p>
      } @else if (items().length === 0) {
        <p>Nenhum usuário encontrado.</p>
      } @else {
        <table>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">E-mail confirmado</th>
              <th scope="col">Último login</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            @for (item of items(); track item.id) {
              <tr>
                <td>{{ item.firstName }} {{ item.lastName }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.emailConfirmed ? 'Sim' : 'Não' }}</td>
                <td>{{ item.lastLoginAt ? (item.lastLoginAt | date: 'short') : '-' }}</td>
                <td>
                  <a [routerLink]="['/users', item.id]">Ver</a>
                  @if (canManage()) {
                    <button type="button" (click)="onRemove(item.id)" aria-label="Excluir usuário {{ item.email }}">
                      Excluir
                    </button>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
  styleUrl: './users-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent {
  items = input.required<UserOutput[]>();
  loading = input(false);
  canManage = input(false);

  remove = output<string>();

  onRemove(id: string): void {
    this.remove.emit(id);
  }
}
