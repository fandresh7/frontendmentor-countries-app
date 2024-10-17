import { Component, inject } from '@angular/core'
import { NgClass } from '@angular/common'
import { GameService } from '../../services/game.service'

@Component({
  selector: 'app-guessing-country',
  standalone: true,
  imports: [NgClass],
  templateUrl: './guessing-country.component.html',
  styleUrl: './guessing-country.component.scss'
})
export class GuessingCountryComponent {
  gameService = inject(GameService)
  countryToGuess = this.gameService.currentCountryToGuess
  isGrayscaleMode = this.gameService.isGrayscaleMode
}
