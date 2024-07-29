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

  constructor() {
    this.initCountries()
  }

  private async initCountries() {
    const countries = await this.fetchCountries()
    this.#countriesSignal.set(countries)
  }

  private async fetchCountries() {
    const countries$ = this.http.get<Country[]>('./data.json')
    return await firstValueFrom(countries$)
  }

  async getCountry(code: string): Promise<Country | null> {
    const cachedCountries = this.countries()

    if (cachedCountries.length === 0) {
      const countries = await this.fetchCountries()
      this.#countriesSignal.set(countries)

      return countries.find(country => country.alpha2Code === code) ?? null
    } else {
      return cachedCountries.find(country => country.alpha2Code === code) ?? null
    }
  }

  async getCountryBorders(country: Country): Promise<Country[]> {
    const cachedCountries = this.countries()

    if (cachedCountries.length === 0) {
      const countries = await this.fetchCountries()
      this.#countriesSignal.set(countries)

      return countries.filter(c => country.borders?.includes(c.alpha3Code))
    } else {
      return cachedCountries.filter(c => country.borders?.includes(c.alpha3Code))
    }
  }
}
