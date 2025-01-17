import { Component, computed, effect, inject, signal } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { AsyncPipe, DecimalPipe } from '@angular/common'

import { CountriesService } from '../../services/countries.service'
import { Country } from '../../models/countries'
import { ArrowLeftIconComponent } from '../../../../shared/components/icons/icons.component'
import { ViewTransitionNameDirective } from '../../../../shared/directives/view-transition-name.directive'

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, RouterLink, ArrowLeftIconComponent, ViewTransitionNameDirective],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  route = inject(ActivatedRoute)
  countriesService = inject(CountriesService)

  country = signal<Country | null>(null)
  borderCountries: Country[] = []

  currencies = computed(() => {
    const country = this.country()
    return country?.currencies?.map(item => item.name).join(', ')
  })

  languages = computed(() => {
    const country = this.country()
    return country?.languages?.map(item => item.name).join(', ')
  })

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
}
