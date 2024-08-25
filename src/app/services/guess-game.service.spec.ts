import { TestBed } from '@angular/core/testing'

import { GuessGameService } from './guess-game.service'

describe('GuessGameService', () => {
  let service: GuessGameService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(GuessGameService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
