import { Component, inject } from '@angular/core'
import { MoonIconComponent, SunIconComponent } from '../../../shared/components/icons/icons.component'
import { DarkModeService } from '../../services/dark-mode.service'

@Component({
  selector: 'app-dark-mode-button',
  standalone: true,
  imports: [SunIconComponent, MoonIconComponent],
  templateUrl: './dark-mode-button.component.html',
  styleUrl: './dark-mode-button.component.scss'
})
export class DarkModeButtonComponent {
  darkModeService = inject(DarkModeService)
  darkMode = this.darkModeService.darkMode

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode()
  }
}
