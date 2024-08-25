import { RandomArrayPipe } from './random-array.pipe'

describe('RandomArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new RandomArrayPipe()
    expect(pipe).toBeTruthy()
  })
})
