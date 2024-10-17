import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { isPlatformServer } from '@angular/common'
import { Country } from '../models/countries'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  platformId = inject(PLATFORM_ID)
  http = inject(HttpClient)

  #countriesSignal = signal<Country[]>([])
  countries = this.#countriesSignal.asReadonly()

  #loadingSignal = signal(false)
  loading = this.#loadingSignal.asReadonly()

  isServer = isPlatformServer(this.platformId)

  constructor() {
    this.getCountries()
  }

  async getCountries(search?: string, region?: string) {
    const query = (search ?? '').toLowerCase().trim()
    const countries = await this.fetchCountries()

    const filteredCountries = countries.filter(country => {
      const matchesSearch = !query || country.name.toLowerCase().includes(query)
      const matchesRegion = !region || country.region === region

      return matchesSearch && matchesRegion
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
