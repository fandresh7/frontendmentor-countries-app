import { Component, computed, inject, output, Signal } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SettingsService } from '../../services/settings.service'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  start = output<void>()

  fb = inject(FormBuilder)
  settingsService = inject(SettingsService)

  availableRegions = ['Americas', 'Europe', 'Asia', 'Africa', 'Oceania']

  form: Signal<FormGroup> = computed(() => {
    const settings = this.settingsService.settings()

    return this.fb.group({
      similarFlags: [settings.similarFlags, [Validators.required]],
      regions: this.fb.array(this.createRegionCheckboxes(settings.regions)),
      independent: [settings.independent, [Validators.required]],
      grayscaleMode: [settings.grayscaleMode, [Validators.required]]
    })
  })

  private createRegionCheckboxes(selectedRegions: string[]) {
    return this.availableRegions.map(region => {
      return this.fb.control(selectedRegions.includes(region))
    })
  }

  private getSelectedRegions(): string[] {
    const { regions } = this.form().value
    return regions.map((value: boolean, i: number) => (value ? this.availableRegions[i] : null)).filter((region: string) => region !== null)
  }

  submit() {
    const settings = this.form().value
    settings.regions = this.getSelectedRegions()

    this.settingsService.updateSettings(settings)
    this.start.emit()
  }
}
