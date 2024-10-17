import { Pipe, PipeTransform } from '@angular/core'
import { getRandomItems } from '../utils/randomArray'

@Pipe({
  name: 'randomArray',
  standalone: true
})
export class RandomArrayPipe<T> implements PipeTransform {
  transform(data: T[]): T[] {
    return getRandomItems(data, data.length)
  }
}
