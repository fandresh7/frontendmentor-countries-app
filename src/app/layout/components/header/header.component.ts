import { Component } from '@angular/core'
import { DarkModeButtonComponent } from '../dark-mode-button/dark-mode-button.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DarkModeButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}
