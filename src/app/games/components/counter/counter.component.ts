import { afterNextRender, Component, computed, signal } from '@angular/core'
import { TimePipe } from '../../../shared/pipes/time.pipe'

const MAX_TIME = 59990
const INTERVAL = 10

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [TimePipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  counter = signal<number>(0)

  interval: number | undefined

  intervalPercentage = computed(() => {
    const counter = this.counter()

    const percentage = (counter * 100) / MAX_TIME
    return percentage
  })

  time = computed(() => {
    const counter = this.counter()

    const time = MAX_TIME - counter
    return time
  })

  constructor() {
    afterNextRender(() => {
      this.initInterval()
    })
  }

  initInterval() {
    this.interval = window.setInterval(() => {
      const nextCounter = this.counter() + INTERVAL

      if (nextCounter >= MAX_TIME) clearInterval(this.interval)

      this.counter.set(nextCounter)
    }, INTERVAL)
  }
}
