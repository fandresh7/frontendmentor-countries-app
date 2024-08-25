import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'randomArray',
  standalone: true
})
export class RandomArrayPipe<T> implements PipeTransform {
  transform(data: T[]): T[] {
    return data
      .map(value => ({ value, sort: Math.random() })) // Assign a random sort key to each item
      .sort((a, b) => a.sort - b.sort) // Sort the array by the random sort key
      .map(({ value }) => value) // Extract the original values
  }
}
