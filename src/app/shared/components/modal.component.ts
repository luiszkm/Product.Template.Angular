import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppModalComponent {
  /** Quando `true`, o painel modal é mostrado. */
  readonly open = input(false);
  /** Título visível no cabeçalho (e `aria-labelledby`). */
  readonly title = input('');
  /** Id estável para o título; use ids distintos se existirem vários modais na mesma página. */
  readonly titleId = input('app-modal-title');

  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.closed.emit();
    }
  }

  onBackdropClick(): void {
    this.closed.emit();
  }

  onCloseButtonClick(): void {
    this.closed.emit();
  }
}
