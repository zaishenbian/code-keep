import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {

  public el: ElementRef

  constructor(el: ElementRef) { 
    this.el = el
  }

  ngAfterViewInit() {
    this.el.nativeElement.focus()
  }

}
