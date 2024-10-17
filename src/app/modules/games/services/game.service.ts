import { computed, inject, Injectable, signal } from '@angular/core'
import { first, tap, timer } from 'rxjs'

import { CountriesService } from '../../countries/services/countries.service'
import { SettingsService } from '../../settings/services/settings.service'
import { Country } from '../../countries/models/countries'
import { getRandomItems } from '../../../shared/utils/randomArray'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  countriesService = inject(CountriesService)
  settingsService = inject(SettingsService)

  askedCountries = signal<Country[]>([])
  correctAnswers = signal<Country[]>([])
  currentCountryToGuess = signal<Country | null>(null)
  selectedCountry = signal<Country | null>(null)

  isGrayscaleMode = computed(() => {
    const { grayscaleMode } = this.settingsService.settings()
    return grayscaleMode
  })

  countriesToPlay = computed(() => {
    const countries = this.countriesService.countries()

    const { regions, independent } = this.settingsService.settings()

    // Apply existing filters
    const filteredCountries = countries.filter(country => {
      const matchesIndependence = independent === 'all' ? true : independent === 'independent' ? country.independent : !country.independent
      const matchesRegion = regions.length > 0 ? regions.includes(country.region) : true

      return matchesIndependence && matchesRegion
    })

    return filteredCountries
  })

  options = computed(() => {
    const { similarFlags } = this.settingsService.settings()

    const currentCountryToGuess = this.currentCountryToGuess()
    if (!currentCountryToGuess) return []

    // Select as options any country even if it isn't match the settings to avoid the lack of options for some countries
    const countries = this.countriesService.countries().filter(country => {
      if (similarFlags) {
        return currentCountryToGuess.similarFlags.includes(country.alpha3Code)
      }

      return true
    })

    const countriesWithoutCountryToGuess = countries.filter(country => country.alpha2Code !== currentCountryToGuess.alpha2Code)

    const options = getRandomItems(countriesWithoutCountryToGuess, 3)
    return [...options, currentCountryToGuess]
  })

  availableCountries = computed(() => {
    const countries = this.countriesToPlay()
    const askedCountriesCodes = this.askedCountries().map(c => c.alpha2Code)

    const remainingCountries = countries.filter(country => {
      return !askedCountriesCodes.includes(country.alpha2Code)
    })

    return remainingCountries
  })

  gameHasFinished = computed(() => {
    const countriesToPlay = this.countriesToPlay()
    const askedCountries = this.askedCountries()

    return countriesToPlay.length === askedCountries.length
  })

  initGame() {
    this.setNextCountryToGuess()
  }

  submitAnswer(selectedCountry: Country) {
    const currentCountryToGuess = this.currentCountryToGuess()
    if (!currentCountryToGuess) return false

    this.selectedCountry.set(selectedCountry)

    const isCorrect = this.isCorrectAnswer(selectedCountry, currentCountryToGuess)
    this.recordAnswer(currentCountryToGuess, isCorrect)

    const timer$ = timer(700).pipe(
      first(),
      tap(() => {
        this.setNextCountryToGuess()
        this.selectedCountry.set(null)
      })
    )

    timer$.subscribe()

    return isCorrect
  }

  private setNextCountryToGuess() {
    const availableCountries = this.availableCountries()
    const countryToGuess = this.getRandomCountry(availableCountries)

    this.currentCountryToGuess.set(countryToGuess)
  }

  private isCorrectAnswer(selectedCountry: Country, countryToGuess: Country): boolean {
    return selectedCountry.alpha2Code === countryToGuess.alpha2Code
  }

  private recordAnswer(country: Country, isCorrect: boolean) {
    this.askedCountries.update(value => [...value, country])

    if (isCorrect) {
      this.correctAnswers.update(value => [...value, country])
    }
  }

  private getRandomCountry(countries: Country[]) {
    if (countries.length === 0) return null

    const randomIndex = Math.floor(Math.random() * countries.length)
    return countries[randomIndex]
  }
}
