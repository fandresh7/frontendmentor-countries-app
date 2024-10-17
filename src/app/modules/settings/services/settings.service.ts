import { Injectable, signal } from '@angular/core'

export interface Settings {
  similarFlags: boolean
  regions: string[]
  independent: 'independent' | 'nonIndependent' | 'all'
  grayscaleMode: boolean
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  #settingsSignal = signal<Settings>({
    similarFlags: true,
    regions: ['Americas', 'Europe', 'Asia', 'Africa', 'Oceania'],
    independent: 'independent',
    grayscaleMode: false
  })

  settings = this.#settingsSignal.asReadonly()

  updateSettings(newSettings: Partial<Settings>) {
    this.#settingsSignal.update(currentSettings => ({
      ...currentSettings,
      ...newSettings
    }))
  }
}
