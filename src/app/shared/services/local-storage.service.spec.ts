import { TestBed } from '@angular/core/testing'

import { LocalStorageService } from './local-storage.service'

fdescribe('LocalStorageService', () => {
  let service: LocalStorageService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LocalStorageService)

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'testKey' ? 'testValue' : null
    })
    spyOn(localStorage, 'setItem')
    spyOn(localStorage, 'removeItem')
    spyOn(localStorage, 'clear')
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return an item from localstorage', () => {
    const ls = service.getItem('testKey')

    expect(ls).toBe('testValue')
    expect(localStorage.getItem).toHaveBeenCalledWith('testKey')
  })

  it('should set an item in localstorage', () => {
    service.setItem('testKey', 'testValue')
    expect(localStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue')
  })

  it('should remove item from localstorage', () => {
    service.removeItem('testKey')
    expect(localStorage.removeItem).toHaveBeenCalledWith('testKey')
  })

  it('should clear localstorage', () => {
    service.clear()
    expect(localStorage.clear).toHaveBeenCalled()
  })
})
