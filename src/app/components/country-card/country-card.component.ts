import { Component, input } from '@angular/core'
import { DecimalPipe } from '@angular/common'
import { RouterLink } from '@angular/router'

import { Country } from '../../models/countries'

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
