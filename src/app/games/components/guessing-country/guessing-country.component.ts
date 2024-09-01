import { Component, inject } from '@angular/core'
import { GuessGameService } from '../../../services/guess-game.service'

@Component({
  selector: 'app-guessing-country',
  standalone: true,
  imports: [],
  templateUrl: './guessing-country.component.html',
  styleUrl: './guessing-country.component.scss'
})
export class GuessingCountryComponent {
  guessGameService = inject(GuessGameService)

  countryToGuess = this.guessGameService.countryToGuess
}
