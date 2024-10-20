import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should container router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy()
  })

  it('should contain HeaderComponent', () => {
    expect(compiled.querySelector('app-header')).toBeTruthy()
  })
})
