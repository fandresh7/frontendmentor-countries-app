import { afterNextRender, Directive, ElementRef, inject, input } from '@angular/core'

@Directive({
  selector: '[appViewTransitionName]',
  standalone: true
})
export class ViewTransitionNameDirective {
  elementRef = inject(ElementRef)

  name = input.required<string>()

  constructor() {
    afterNextRender(() => {
      console.log(this.name())
      this.setTransitionName()
    })
  }

  setTransitionName() {
    const element = this.elementRef.nativeElement
    element.style.viewTransitionName = this.name()
  }
}
