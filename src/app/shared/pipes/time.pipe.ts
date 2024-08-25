import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {
  transform(milisenconds: number): string {
    const timeInSeconds = milisenconds / 1000
    const result: string[] = []

    const days = Math.floor(timeInSeconds / 86400)
    const hours = Math.floor((timeInSeconds % 86400) / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = Math.floor(timeInSeconds % 60)

    if (days > 0) result.push(days.toString().padStart(2, '0'))
    if (hours > 0) result.push(hours.toString().padStart(2, '0'))
    if (minutes > 0) result.push(minutes.toString().padStart(2, '0'))
    if (seconds > 0) result.push(seconds.toString().padStart(2, '0'))

    return result.join(':') || '00'
  }
}
