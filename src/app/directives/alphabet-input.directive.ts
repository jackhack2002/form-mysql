import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetInput]'
})
export class AlphabetInputDirective {

  constructor() { }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const regex = /[^a-z A-Z]/g;
    input.value = input.value.replace(regex, '');
  }

}
