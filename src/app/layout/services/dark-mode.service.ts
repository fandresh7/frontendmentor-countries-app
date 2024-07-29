import { isPlatformBrowser } from '@angular/common'
import { afterNextRender, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  platformId = inject(PLATFORM_ID)
  isBrowser: boolean

  #darkModeSignal = signal<boolean>(false)
  darkMode = this.#darkModeSignal.asReadonly()

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId)

    afterNextRender(() => {
      this.initDarkMode()
    })

    effect(() => {
      const darkMode = this.darkMode()
      if (this.isBrowser) localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    })
  }

  initDarkMode() {
    const theme = localStorage.getItem('theme')
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

    bodyElement.classList.toggle('dark')
    if (bodyElement.classList.contains('dark')) {
      this.#darkModeSignal.set(true)
    } else {
      this.#darkModeSignal.set(false)
    }
  }
}
