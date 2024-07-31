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
      this.setTransitionName()
    })
  }

  setTransitionName() {
    const element = this.elementRef.nativeElement
    element.style.viewTransitionName = this.name()
  }
}
