import { Component, inject, output } from '@angular/core'
import { GuessGameService } from '../../../services/guess-game.service'
import { TimerService } from '../../../services/timer.service'
import { TimePipe } from '../../../shared/pipes/time.pipe'

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [TimePipe],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss'
})
export class FinishComponent {
  guessGameService = inject(GuessGameService)
  timerService = inject(TimerService)

  startGame = output<void>()

  counter = this.timerService.counter
  userCorrectAnswers = this.guessGameService.userCorrectAnswers
  askedCountries = this.guessGameService.askedCountries

  onStartGame() {
    this.startGame.emit()
  }
}
