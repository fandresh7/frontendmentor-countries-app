import { Component, inject, signal } from '@angular/core'
import { SettingsComponent } from '../../../settings/components/settings/settings.component'
import { GuessFlagComponent } from '../../components/guess-flag/guess-flag.component'
import { CountriesService } from '../../../countries/services/countries.service'

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [SettingsComponent, GuessFlagComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  countriesService = inject(CountriesService)

  mode = signal<'settings' | 'game'>('settings')

  changeMode(mode: 'settings' | 'game') {
    this.mode.set(mode)
  }
}
