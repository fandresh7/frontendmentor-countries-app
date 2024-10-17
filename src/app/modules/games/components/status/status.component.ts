import { Component, inject } from '@angular/core'
import { GameService } from '../../services/game.service'

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  gameService = inject(GameService)

  userCorrectAnswers = this.gameService.correctAnswers
  countriesToPlay = this.gameService.countriesToPlay
  askedCountries = this.gameService.askedCountries
}
