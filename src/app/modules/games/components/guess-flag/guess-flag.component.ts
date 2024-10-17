import { afterNextRender, Component, effect, inject } from '@angular/core'

import { CounterComponent } from '../../../timer/components/counter/counter.component'
import { FinishComponent } from '../finish/finish.component'
import { StatusComponent } from '../status/status.component'
import { OptionComponent } from '../option/option.component'
import { GuessingCountryComponent } from '../guessing-country/guessing-country.component'
import { Country } from '../../../countries/models/countries'
import { RandomArrayPipe } from '../../../../shared/pipes/random-array.pipe'
import { TimerService } from '../../../timer/services/timer.service'
import { GameService } from '../../services/game.service'

@Component({
  selector: 'app-guess-flag',
  standalone: true,
  imports: [RandomArrayPipe, CounterComponent, FinishComponent, StatusComponent, OptionComponent, GuessingCountryComponent],
  templateUrl: './guess-flag.component.html',
  styleUrl: './guess-flag.component.scss'
})
export class GuessFlagComponent {
  timerService = inject(TimerService)
  gameService = inject(GameService)

  counter = this.timerService.counter

  options = this.gameService.options
  gameHasFinished = this.gameService.gameHasFinished

  constructor() {
    afterNextRender(() => {
      this.startGame()
    })

    effect(() => {
      if (!this.gameHasFinished()) return
      this.timerService.stopTimer()
    })
  }

  startGame() {
    this.timerService.resetTimer()
    this.timerService.startTimer()
    this.gameService.initGame()
  }

  answer(country: Country) {
    this.gameService.submitAnswer(country)
  }
}
