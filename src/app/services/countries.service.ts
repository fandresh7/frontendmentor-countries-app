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

  async getCountry(code: string) {
    if (this.countries().length === 0) {
      await this.initCountries()
    }

    return this.countries().find(country => country.alpha2Code === code) ?? null
  }

  async getCountryBorders(country: Country) {
    if (this.countries().length === 0) {
      await this.initCountries()
    }
    return this.countries().filter(c => country.borders?.includes(c.alpha3Code))
  }
}
