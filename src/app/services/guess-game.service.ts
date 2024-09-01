import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { first, tap, timer } from 'rxjs'

import { Country } from '../models/countries'
import { CountriesService } from './countries.service'
import { generateRandomOptions } from '../shared/utils/randomArray'

interface Settings {
  similarFlags: boolean
  regions: string[]
  independent: 'independent' | 'nonIndependent'
  grayscaleMode: boolean
}

@Injectable({
  providedIn: 'root'
})
export class GuessGameService {
  platformId = inject(PLATFORM_ID)
  isBrowser = isPlatformBrowser(this.platformId)

  #settingsSignal = signal<Settings>({ similarFlags: true, regions: [], independent: 'independent', grayscaleMode: false })
  settings = this.#settingsSignal.asReadonly()

  countriesService = inject(CountriesService)
  countries = this.countriesService.countries

  #userCorrectAnswersSignal = signal<Country[]>([])
  userCorrectAnswers = this.#userCorrectAnswersSignal.asReadonly()

  #askedCountriesSignal = signal<Country[]>([])
  askedCountries = this.#askedCountriesSignal.asReadonly()

  #selectedCountrySignal = signal<Country | null>(null)
  selectedCountry = this.#selectedCountrySignal.asReadonly()

  setSelectedCountry(country: Country | null) {
    this.#selectedCountrySignal.set(country)
  }

  addUserCorrectAnswers(country: Country) {
    this.#userCorrectAnswersSignal.update(value => {
      const update = [...value, country]
      return update
    })
  }

  addAskedQuestions(country: Country) {
    this.#askedCountriesSignal.update(value => {
      const update = [...value, country]
      return update
    })
  }

  countriesToPlay = computed(() => {
    const { regions, independent } = this.#settingsSignal()

    return this.countries().filter(country => {
      const matchesIndependence = independent ? country.independent : true
      const matchesRegion = regions.length > 0 ? regions.includes(country.region) : true
      return matchesIndependence && matchesRegion
    })
  })

  isCorrectAnswer = computed(() => {
    const countryToGuess = this.countryToGuess()
    const selectedCountry = this.selectedCountry()

    return countryToGuess?.alpha2Code === selectedCountry?.alpha2Code
  })

  countryToGuess = computed<Country | null>(() => {
    if (!this.isBrowser) return null

    const askedCountries = this.askedCountries().map(c => c.alpha2Code)
    const countries = this.countriesToPlay().filter(c => !askedCountries.includes(c.alpha2Code))

    return generateRandomOptions(countries, 1)[0] || null
  })

  randomCountries = computed<Country[]>(() => {
    if (!this.isBrowser) return []

    const AMOUNT_OPTIONS = 4
    const { similarFlags } = this.#settingsSignal()

    const countryToGuess = this.countryToGuess()
    if (!countryToGuess) return []

    // Apply settings for similar flags
    const countriesOptions = this.countriesToPlay().filter(country => {
      return similarFlags ? countryToGuess.similarFlags.includes(country.alpha3Code) : true
    })

    const options = generateRandomOptions(countriesOptions, AMOUNT_OPTIONS - 1)
    return [...options, countryToGuess]
  })

  gameHasFinish = computed(() => {
    return this.countriesToPlay().length > 0 && this.countriesToPlay().length === this.askedCountries().length
  })

  initialize() {
    this.#userCorrectAnswersSignal.set([])
    this.#askedCountriesSignal.set([])
  }

  userResponse(guessedCountry: Country) {
    this.setSelectedCountry(guessedCountry)

    const timer$ = timer(700).pipe(
      first(),
      tap(() => {
        const countryToGuess = this.countryToGuess()
        if (!countryToGuess) return

        if (guessedCountry.alpha2Code === countryToGuess.alpha2Code) {
          this.addUserCorrectAnswers(guessedCountry)
        }

        this.addAskedQuestions(countryToGuess)
        this.setSelectedCountry(null)
      })
    )

    timer$.subscribe()
  }

  updateSettings(newSettings: Partial<Settings>) {
    this.#settingsSignal.update(currentSettings => ({ ...currentSettings, ...newSettings }))
  }
}
