import { Component, input } from '@angular/core'
import { DecimalPipe } from '@angular/common'
import { RouterLink } from '@angular/router'

import { Country } from '../../models/countries'
import { ViewTransitionNameDirective } from '../../shared/directives/view-transition-name.directive'

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [DecimalPipe, RouterLink, ViewTransitionNameDirective],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.scss'
})
export class CountryCardComponent {
  country = input.required<Country>()
}
