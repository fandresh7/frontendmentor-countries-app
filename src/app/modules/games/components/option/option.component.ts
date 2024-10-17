import { Component, computed, inject, input } from '@angular/core'
import { NgClass } from '@angular/common'

import { Country } from '../../../countries/models/countries'
import { GameService } from '../../services/game.service'

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [NgClass],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss'
})
export class OptionComponent {
  country = input.required<Country>()

  gameService = inject(GameService)

  countryToGuess = this.gameService.currentCountryToGuess
  selectedCountry = this.gameService.selectedCountry

  isCorrectAnswer = computed(() => {
    const selectedCountry = this.selectedCountry()
    const countryToGuess = this.countryToGuess()

    return selectedCountry?.alpha2Code === countryToGuess?.alpha2Code
  })

  isSelectedCountry = computed(() => {
    const country = this.country()
    const selectedCountry = this.selectedCountry()

    return country.alpha2Code === selectedCountry?.alpha2Code
  })

  submitAnswer() {
    this.gameService.submitAnswer(this.country())
  }
}
