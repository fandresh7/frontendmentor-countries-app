/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing'

import { DarkModeService } from './dark-mode.service'
import { LocalStorageService } from '../../shared/services/local-storage.service'
import { DOCUMENT } from '@angular/common'

class LocalStorageServiceMock {
  getItem = jasmine.createSpy('getItem')
  setItem = jasmine.createSpy('setItem')
}

describe('DarkModeService', () => {
  let service: DarkModeService
  let document: Document
  let localStorageServiceMock: LocalStorageServiceMock

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useClass: LocalStorageServiceMock }]
    })

    service = TestBed.inject(DarkModeService)
    localStorageServiceMock = TestBed.inject(LocalStorageService) as unknown as LocalStorageServiceMock
    document = TestBed.inject(DOCUMENT)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should initialize dark mode to false when localStorage returns light', () => {
    spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {}
    } as any)

    localStorageServiceMock.getItem.and.returnValue('light')
    service['initDarkMode']()

    expect(service.darkMode()).toBe(false)
    expect(document.querySelector('body')?.classList.contains('dark')).toBe(false)
    expect(localStorageServiceMock.getItem).toHaveBeenCalledWith('theme')
  })

  it('should initialize dark mode to false when no theme is found in localStorage and prefers light mode', () => {
    spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {}
    } as any)

    localStorageServiceMock.getItem.and.returnValue(null)

    service['initDarkMode']()

    expect(service.darkMode()).toBe(false)
    expect(document.querySelector('body')?.classList.contains('dark')).toBe(false)
    expect(localStorageServiceMock.getItem).toHaveBeenCalledWith('theme')
  })

  it('should toggle DarkMode to dark then to light', () => {
    const darkMode = service.darkMode

    service.toggleDarkMode()
    expect(darkMode()).toBe(true)
    expect(document.querySelector('body')?.classList.contains('dark')).toBe(true)

    service.toggleDarkMode()
    expect(darkMode()).toBe(false)
    expect(document.querySelector('body')?.classList.contains('dark')).toBe(false)
  })
})
