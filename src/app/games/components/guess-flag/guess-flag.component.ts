import { Component, inject } from '@angular/core'
import { NgClass } from '@angular/common'

import { RandomArrayPipe } from '../../../shared/pipes/random-array.pipe'
import { GuessGameService } from '../../../services/guess-game.service'
import { Country } from '../../../models/countries'

@Component({
  selector: 'app-guess-flag',
  standalone: true,
  imports: [RandomArrayPipe, NgClass],
  templateUrl: './guess-flag.component.html',
  styleUrl: './guess-flag.component.scss'
})
export class GuessFlagComponent {
  guessGameService = inject(GuessGameService)

  randomCountries = this.guessGameService.randomCountries
  countryToGuess = this.guessGameService.countryToGuess
  selectedCountry = this.guessGameService.selectedCountry
  isCorrectAnswer = this.guessGameService.isCorrectAnswer
  userCorrectAnswer = this.guessGameService.userCorrectAnswer

  userResponse(country: Country) {
    this.guessGameService.userResponse(country)
  }
}
