import { isPlatformBrowser } from '@angular/common'
import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core'

// const MAX_TIME = 120000
const MAX_TIME = 1200000
const INTERVAL = 10

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  platformId = inject(PLATFORM_ID)
  isBrowser = isPlatformBrowser(this.platformId)

  #counterSignal = signal<number>(MAX_TIME)
  counter = this.#counterSignal.asReadonly()

  intervalId: number | undefined

  intervalPercentage = computed(() => {
    const counter = this.counter()
    return (counter * 100) / MAX_TIME
  })

  startTimer() {
    if (!this.isBrowser) return
    this.initInterval()
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  resetTimer() {
    this.#counterSignal.set(MAX_TIME)
  }

  private initInterval() {
    if (!window) return

    this.intervalId = window.setInterval(() => {
      const nextCounter = this.#counterSignal() - INTERVAL

      if (nextCounter <= 0) {
        this.stopTimer()
      }

      this.#counterSignal.set(nextCounter)
    }, INTERVAL)
  }
}
