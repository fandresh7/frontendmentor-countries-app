import { Component, signal } from '@angular/core'
import { SettingsComponent } from '../../components/settings/settings.component'
import { GuessFlagComponent } from '../../components/guess-flag/guess-flag.component'

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [SettingsComponent, GuessFlagComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  mode = signal<'settings' | 'game'>('settings')
}
