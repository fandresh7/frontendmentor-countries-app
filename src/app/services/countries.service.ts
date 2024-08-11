import { inject, Injectable, signal } from '@angular/core'
import { Country } from '../models/countries'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  http = inject(HttpClient)

  #countriesSignal = signal<Country[]>([])
  countries = this.#countriesSignal.asReadonly()

  #loadingSignal = signal(false)
  loading = this.#loadingSignal.asReadonly()

  constructor() {
    this.getCountries()
  }

  async getCountries(search?: string, region?: string) {
    search = search?.toLowerCase().trim()

    const countries = await this.fetchCountries()

    const filteredCountries = countries.filter(country => {
      const searchCondition = !search || country.name.toLowerCase().includes(search)
      const regionCondition = !region || country.region === region

      return searchCondition && regionCondition
    })

    this.#countriesSignal.set(filteredCountries)
  }

  private async fetchCountries() {
    this.#loadingSignal.set(true)

    const countries$ = this.http.get<Country[]>('./data.json')
    const countries = await firstValueFrom(countries$)

    this.#loadingSignal.set(false)

    return countries
  }

  async getCountry(code: string) {
    if (this.countries().length === 0) {
      await this.getCountries()
    }

    return this.countries().find(country => country.alpha2Code === code) ?? null
  }

  async getCountryBorders(country: Country) {
    if (this.countries().length === 0) {
      await this.getCountries()
    }
    return this.countries().filter(c => country.borders?.includes(c.alpha3Code))
  }
}
