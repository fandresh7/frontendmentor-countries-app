import { Component, effect, inject, OnInit } from '@angular/core'
import { NgClass } from '@angular/common'

import { RandomArrayPipe } from '../../../shared/pipes/random-array.pipe'
import { GuessGameService } from '../../../services/guess-game.service'
import { Country } from '../../../models/countries'
import { CounterComponent } from '../counter/counter.component'
import { TimerService } from '../../../services/timer.service'

@Component({
  selector: 'app-guess-flag',
  standalone: true,
  imports: [RandomArrayPipe, NgClass, CounterComponent],
  templateUrl: './guess-flag.component.html',
  styleUrl: './guess-flag.component.scss'
})
export class GuessFlagComponent implements OnInit {
  guessGameService = inject(GuessGameService)
  timerService = inject(TimerService)

  randomCountries = this.guessGameService.randomCountries
  countryToGuess = this.guessGameService.countryToGuess
  selectedCountry = this.guessGameService.selectedCountry
  isCorrectAnswer = this.guessGameService.isCorrectAnswer
  userCorrectAnswers = this.guessGameService.userCorrectAnswers
  askedCountries = this.guessGameService.askedCountries
  gameHasFinish = this.guessGameService.gameHasFinish

  counter = this.timerService.counter

  constructor() {
    effect(() => {
      if (!this.gameHasFinish()) return
      this.timerService.stopTimer()
    })
  }

  ngOnInit() {
    this.startGame()
  }

  startGame() {
    this.timerService.resetTimer()
    this.timerService.startTimer()
    this.guessGameService.initialize()
  }

  userResponse(country: Country) {
    this.guessGameService.userResponse(country)
  }
}
