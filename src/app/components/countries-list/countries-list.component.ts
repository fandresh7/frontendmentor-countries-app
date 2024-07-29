import { Component, input } from '@angular/core'
import { Country } from '../../models/countries'
import { CountryCardComponent } from '../country-card/country-card.component'

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [CountryCardComponent],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss'
})
export class CountriesListComponent {
  countries = input.required<Country[]>()
}
