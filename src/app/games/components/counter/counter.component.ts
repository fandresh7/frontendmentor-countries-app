import { Component, inject } from '@angular/core'
import { TimePipe } from '../../../shared/pipes/time.pipe'
import { TimerService } from '../../../services/timer.service'

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [TimePipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  timerService = inject(TimerService)

  counter = this.timerService.counter
  intervalPercentage = this.timerService.intervalPercentage
}
