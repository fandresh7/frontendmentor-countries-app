import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core'
import { CountriesService } from '../../services/countries.service'
import { Country } from '../../models/countries'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { AsyncPipe, DecimalPipe } from '@angular/common'
import { ArrowLeftIconComponent } from '../../shared/components/icons/icons.component'

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, RouterLink, ArrowLeftIconComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  platformId = inject(PLATFORM_ID)
  route = inject(ActivatedRoute)
  countriesService = inject(CountriesService)

  country = signal<Country | null>(null)
  borderCountries: Country[] = []

  constructor() {
    this.route.params.subscribe(params => {
      const countryCode = params['id']

      this.countriesService.getCountry(countryCode).then(country => {
        this.country.set(country)
      })
    })

    effect(() => {
      const country = this.country()
      if (!country) return

      this.countriesService.getCountryBorders(country).then(response => {
        this.borderCountries = response
      })
    })
  }

  getCurrencies(country: Country) {
    return country.currencies?.map(item => item.name).join(', ')
  }

  getLanguages(country: Country) {
    return country.languages?.map(item => item.name).join(', ')
  }
}
