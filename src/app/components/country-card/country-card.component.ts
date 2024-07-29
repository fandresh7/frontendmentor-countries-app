import { Component, input } from '@angular/core'
import { Country } from '../../models/countries'
import { DecimalPipe } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.scss'
})
export class CountryCardComponent {
  country = input.required<Country>()
}
