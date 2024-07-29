import { Component, inject, signal } from '@angular/core'
import { CountriesService } from '../../services/countries.service'
import { Country } from '../../models/countries'
import { CountriesListComponent } from '../../components/countries-list/countries-list.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountriesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  countriesService = inject(CountriesService)

  countries = signal<Country[]>([]).asReadonly()

  constructor() {
    this.countries = this.countriesService.countries
  }
}
