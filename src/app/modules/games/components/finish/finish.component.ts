import { Component, inject, output } from '@angular/core'
import { TimePipe } from '../../../../shared/pipes/time.pipe'
import { TimerService } from '../../../timer/services/timer.service'
import { GameService } from '../../services/game.service'

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [TimePipe],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss'
})
export class FinishComponent {
  gameService = inject(GameService)
  timerService = inject(TimerService)

  startGame = output<void>()

  counter = this.timerService.counter
  userCorrectAnswers = this.gameService.correctAnswers
  askedCountries = this.gameService.askedCountries

  onStartGame() {
    this.startGame.emit()
  }
}
