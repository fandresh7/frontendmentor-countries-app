import { Component, inject, input } from '@angular/core'
import { GuessGameService } from '../../../services/guess-game.service'
import { Country } from '../../../models/countries'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [NgClass],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss'
})
export class OptionComponent {
  guessGameService = inject(GuessGameService)
  country = input.required<Country>()

  isCorrectAnswer = this.guessGameService.isCorrectAnswer
  selectedCountry = this.guessGameService.selectedCountry

  userResponse(country: Country) {
    this.guessGameService.userResponse(country)
  }
}
