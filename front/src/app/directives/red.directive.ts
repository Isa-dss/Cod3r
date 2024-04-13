import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]'
  // DIRETIVA DE ATRIBUTO
})
export class RedDirective {

  constructor(private el:ElementRef) { 
    el.nativeElement.style.color = '#e35e6b'
  }

}
