import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GuessingCountryComponent } from './guessing-country.component'

describe('GuessingCountryComponent', () => {
  let component: GuessingCountryComponent
  let fixture: ComponentFixture<GuessingCountryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessingCountryComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(GuessingCountryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
