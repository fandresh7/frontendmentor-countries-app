import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GuessFlagComponent } from './guess-flag.component'

describe('GuessFlagComponent', () => {
  let component: GuessFlagComponent
  let fixture: ComponentFixture<GuessFlagComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessFlagComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(GuessFlagComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
