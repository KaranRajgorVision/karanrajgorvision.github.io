import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberValidator]'
})
export class NumberValidatorDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation(); // Prevent the input event if non-numeric characters were removed
    }
  }
}
