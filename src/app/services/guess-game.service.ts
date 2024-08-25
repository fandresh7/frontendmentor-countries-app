import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { first, tap, timer } from 'rxjs'

import { Country } from '../models/countries'
import { CountriesService } from './countries.service'
import { generateRandomOptions } from '../shared/utils/randomArray'

@Injectable({
  providedIn: 'root'
})
export class GuessGameService {
  platformId = inject(PLATFORM_ID)
  isBrowser = isPlatformBrowser(this.platformId)

  countriesService = inject(CountriesService)
  countries = this.countriesService.countries

  #userCorrectAnswersSignal = signal<Country[]>([])
  userCorrectAnswer = this.#userCorrectAnswersSignal.asReadonly()

  #currentAmountQuestionsSignal = signal<Country[]>([])
  currentAmountQuestions = this.#currentAmountQuestionsSignal.asReadonly()

  #selectedCountrySignal = signal<Country | null>(null)
  selectedCountry = this.#selectedCountrySignal.asReadonly()

  setSelectedCountry(country: Country | null) {
    this.#selectedCountrySignal.set(country)
  }

  addUserCorrectAnswer(country: Country) {
    this.#userCorrectAnswersSignal.update(value => {
      const update = [...value, country]
      return update
    })
  }

  addCurrentAmountQuestion(country: Country) {
    this.#currentAmountQuestionsSignal.update(value => {
      const update = [...value, country]
      return update
    })
  }

  isCorrectAnswer = computed(() => {
    const countryToGuess = this.countryToGuess()
    const selectedCountry = this.selectedCountry()

    return countryToGuess?.alpha2Code === selectedCountry?.alpha2Code
  })

  randomCountries = computed<Country[]>(() => {
    if (!this.isBrowser) return []

    const countries = this.countries()
    const currentQuestionsIds = this.currentAmountQuestions().map(item => item.alpha2Code)
    const restCountries = countries.filter(country => !currentQuestionsIds.includes(country.alpha2Code))

    const randomCountries = generateRandomOptions(restCountries, 4)
    return randomCountries
  })

  countryToGuess = computed<Country | null>(() => {
    if (!this.isBrowser) return null

    const country = this.randomCountries()[0]
    return country ?? null
  })

  initialize() {
    this.#userCorrectAnswersSignal.set([])
    this.#currentAmountQuestionsSignal.set([])
  }

  userResponse(guessedCountry: Country) {
    this.setSelectedCountry(guessedCountry)

    const timer$ = timer(1000).pipe(
      first(),
      tap(() => {
        const countryToGuess = this.countryToGuess()

        if (guessedCountry.alpha2Code === countryToGuess?.alpha2Code) {
          this.addUserCorrectAnswer(guessedCountry)
        }

        this.addCurrentAmountQuestion(guessedCountry)
        this.setSelectedCountry(null)
      })
    )

    timer$.subscribe()
  }
}
