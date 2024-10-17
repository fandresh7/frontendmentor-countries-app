import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'

import { debounceTime, distinctUntilChanged } from 'rxjs'
import { ArrowBottomComponent, SearchIconComponent } from '../../../../shared/components/icons/icons.component'
import { CountriesService } from '../../services/countries.service'

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [ReactiveFormsModule, SearchIconComponent, ArrowBottomComponent],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent implements OnInit {
  fb = inject(FormBuilder)
  countriesService = inject(CountriesService)

  form = this.fb.group({
    search: [''],
    region: ['']
  })

  ngOnInit() {
    const valueChanges$ = this.form.valueChanges.pipe(debounceTime(300), distinctUntilChanged())

    valueChanges$.subscribe(async value => {
      await this.countriesService.getCountries(value.search!, value.region!)
    })
  }
}
