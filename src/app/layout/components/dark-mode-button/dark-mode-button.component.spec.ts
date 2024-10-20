import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DarkModeButtonComponent } from './dark-mode-button.component'
import { DarkModeService } from '../../services/dark-mode.service'

class DarkModeServiceMock {
  darkMode = jasmine.createSpy('darkMode').and.returnValue(true)
  toggleDarkMode = jasmine.createSpy('toggleDarkMode')
}

fdescribe('DarkModeButtonComponent', () => {
  let component: DarkModeButtonComponent
  let fixture: ComponentFixture<DarkModeButtonComponent>
  let compiled: HTMLElement

  let darkModeServiceMock: DarkModeServiceMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkModeButtonComponent],
      providers: [{ provide: DarkModeService, useClass: DarkModeServiceMock }]
    }).compileComponents()

    fixture = TestBed.createComponent(DarkModeButtonComponent)
    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance

    darkModeServiceMock = TestBed.inject(DarkModeService) as unknown as DarkModeServiceMock
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call toggleDarkMode', () => {
    component.toggleDarkMode()
    expect(darkModeServiceMock.toggleDarkMode).toHaveBeenCalled()
  })

  it('should render moon icon if darkMode is true', () => {
    darkModeServiceMock.darkMode.and.returnValue(true)
    fixture.detectChanges()

    expect(compiled.querySelector('app-moon-icon')).toBeTruthy()
    expect(compiled.querySelector('app-sun-icon')).toBeFalsy()
  })

  it('should render sun icon if darkMode is false', () => {
    darkModeServiceMock.darkMode.and.returnValue(false)
    fixture.detectChanges()

    expect(compiled.querySelector('app-sun-icon')).toBeTruthy()
    expect(compiled.querySelector('app-moon-icon')).toBeFalsy()
  })

  it('should call toggleDarkMode when the button is clicked', () => {
    const button = compiled.querySelector('button')
    button?.click()

    expect(darkModeServiceMock.toggleDarkMode).toHaveBeenCalled()
  })
})
