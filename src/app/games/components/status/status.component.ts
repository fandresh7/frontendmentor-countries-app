import { Component, inject } from '@angular/core'
import { GuessGameService } from '../../../services/guess-game.service'

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  guessGameService = inject(GuessGameService)

  userCorrectAnswers = this.guessGameService.userCorrectAnswers
  countriesToPlay = this.guessGameService.countriesToPlay
  askedCountries = this.guessGameService.askedCountries
}
