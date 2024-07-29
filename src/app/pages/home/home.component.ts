import { Component, inject } from '@angular/core'
import { CountriesService } from '../../services/countries.service'
import { CountriesListComponent } from '../../components/countries-list/countries-list.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountriesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private countriesService = inject(CountriesService)
  countries = this.countriesService.countries
}
