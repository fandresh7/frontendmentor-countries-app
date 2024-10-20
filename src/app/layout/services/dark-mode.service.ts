import { isPlatformBrowser } from '@angular/common'
import { afterNextRender, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core'
import { LocalStorageService } from '../../shared/services/local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private platformId = inject(PLATFORM_ID)
  private isBrowser = isPlatformBrowser(this.platformId)

  localStorageService = inject(LocalStorageService)

  #darkModeSignal = signal<boolean>(false)
  darkMode = this.#darkModeSignal.asReadonly()

  constructor() {
    afterNextRender(() => {
      this.initDarkMode()
    })

    effect(() => {
      const darkMode = this.darkMode()
      if (this.isBrowser) this.localStorageService.setItem('theme', darkMode ? 'dark' : 'light')
    })
  }

  private initDarkMode() {
    const theme = this.localStorageService.getItem('theme')
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    const bodyElement = document.querySelector('body')!

    if (theme === 'dark' || (!theme && prefersDarkMode)) {
      this.#darkModeSignal.set(true)
      bodyElement.classList.add('dark')
    } else {
      bodyElement.classList.remove('dark')
      this.#darkModeSignal.set(false)
    }
  }

  toggleDarkMode() {
    const bodyElement = document.querySelector('body')!

    const isDarkMode = bodyElement.classList.toggle('dark')
    this.#darkModeSignal.set(isDarkMode)
  }
}
