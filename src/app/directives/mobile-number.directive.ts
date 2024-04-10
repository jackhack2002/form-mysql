import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMobileNumber]'
})
export class MobileNumberDirective {

 
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('blur') onBlur(): void {
    const value = this.el.nativeElement.value;
    if (value && value.length !== 10) {
      this.control.control?.setErrors({ 'invalidMobileNumber': true });
    } else {
      this.control.control?.setErrors(null);
    }
  }


  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const initialValue = this.el.nativeElement.value;
    const sanitizedValue = initialValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    this.el.nativeElement.value = sanitizedValue;
    if (initialValue !== sanitizedValue) {
      event.stopPropagation();
    }
  }


}
