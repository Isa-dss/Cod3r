import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

// é interessante colocar apenas o conteudo relacionado a parte gráfica aqui no component, e a parte lógica no service.
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }
  

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void { }

  createProduct(): void {
    // o subscribe é se inscrever no metodo, portanto quando o create acontecer, o susbcribe vai receber esse dado e agir conforme foi programado. 
    this.productService.create(this.product).subscribe(()=>{
      this.productService.showMessage("Produto criado!");
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

  // propLegal = "qualquer"
  // fazerAlgo() : void{
  //   console.log("Fazendo algo")
  // }

}
