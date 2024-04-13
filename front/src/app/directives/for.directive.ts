import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myFor]',
  // DIRETIVA ESTRUTURAL
})
export class ForDirective implements OnInit {

  @Input("myForEm")
  numbers: number[] = [];
  // @Input('myForEm') texto!: string;

  // com essa diretiva, adiconamos mais elementos na DOM (em). Alterando-a estruturalmente 

  constructor(
    private container:ViewContainerRef, 
    private template: TemplateRef<any>
    ) {}

  ngOnInit():void{
  for(let number of this.numbers)  {
    this.container.createEmbeddedView(
      this.template, { $implicit : number})
  }
// vai criar um container para cada elemento do for, no caso em especifico vai criar um container para cada template, para cada li 

  }

}
