import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Base } from './services/base';

@Component({
  selector: 'app-root',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly service = inject(Base);
  private readonly destroyRef = inject(DestroyRef);

  readonly message = signal('Sin datos todavia');
  readonly status = signal<number | null>(null);
  readonly isLoading = signal(true);
  readonly hasError = signal('');
  readonly lastUpdated = signal<Date | null>(null);

  readonly isHealthy = computed(() => {
    const currentStatus = this.status();
    return currentStatus !== null && currentStatus >= 200 && currentStatus < 400;
  });


  ngOnInit() {
    this.loadStatus();
  }

  loadStatus() {
    this.isLoading.set(true);
    this.hasError.set('');

    this.service
      .getMessage()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.message.set(response.message);
          this.status.set(response.status);
          this.lastUpdated.set(new Date());
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set('No se pudo conectar con el backend en http://localhost:8080/api/devops');
          this.isLoading.set(false);
        }
      });
  }
}
