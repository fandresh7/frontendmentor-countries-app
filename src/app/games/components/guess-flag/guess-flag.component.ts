import { Component, effect, inject } from '@angular/core'

import { GuessGameService } from '../../../services/guess-game.service'
import { TimerService } from '../../../services/timer.service'

import { RandomArrayPipe } from '../../../shared/pipes/random-array.pipe'

import { CounterComponent } from '../counter/counter.component'
import { FinishComponent } from '../finish/finish.component'
import { StatusComponent } from '../status/status.component'
import { OptionComponent } from '../option/option.component'
import { GuessingCountryComponent } from '../guessing-country/guessing-country.component'

import { Country } from '../../../models/countries'

@Component({
  selector: 'app-guess-flag',
  standalone: true,
  imports: [RandomArrayPipe, CounterComponent, FinishComponent, StatusComponent, OptionComponent, GuessingCountryComponent],
  templateUrl: './guess-flag.component.html',
  styleUrl: './guess-flag.component.scss'
})
export class GuessFlagComponent {
  guessGameService = inject(GuessGameService)
  timerService = inject(TimerService)

  randomCountries = this.guessGameService.randomCountries
  gameHasFinish = this.guessGameService.gameHasFinish

  counter = this.timerService.counter

  constructor() {
    effect(() => {
      if (!this.gameHasFinish()) return
      this.timerService.stopTimer()
    })
  }

  startGame() {
    this.timerService.resetTimer()
    this.timerService.startTimer()
    this.guessGameService.initialize()
  }

  userResponse(country: Country) {
    this.guessGameService.userResponse(country)
  }
}
