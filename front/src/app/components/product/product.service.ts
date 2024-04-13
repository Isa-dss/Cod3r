import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { EMPTY, Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
  // POR SER UM ROOT ISSO INFERE DIZER QUE É SINGLETON, OU SEJA, UMA INSTÂNCIA ÚNICA. SE HOUVER UM CONTADOR AQUI, ELE NAO SERA INICIALIZADO TODA VEZ QUE O SERVICE FOR CHAMADO, SERA APENAS IMPLEMENTADO
})

// essa classe pode ser injetada em outras classes
export class ProductService {
  baseUrl = 'http://localhost:3001/products'

  constructor(private snackBar:MatSnackBar, private httpClient: HttpClient) { }

  showMessage(msg: string, isError: boolean = false) :void{
    // Tres parametros: mensagem (que é recebido no metodo), o metodo que permite fechar a janela ( se ficar "", nao tera a opção de fechar) e a posição desta snackbar. 
    this.snackBar.open(msg,'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass : isError ? ['error'] : ['success']
    }); 
  }

  //  mando para o backend um produto(nome e preco) e espero receber como reposta um produto com id,nome e preco
  // quando a resposta do back chegar, dispare tal função = observer 
  // neste caso, só retorna um observable de produto 
  create(product:Product): Observable<Product>{
   return this.httpClient.post<Product>(this.baseUrl, product).pipe(
    map(obj => obj),
    catchError((e) => this.errorHandler(e))
   );
  }

  errorHandler (e: any): Observable<any>{
    this.showMessage("Ocorreu um erro!" , true);
    return EMPTY;
  }
  read(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.baseUrl)
  }

  readById(id : number) : Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.httpClient.get<Product>(url)
  }
  
  update (product :  Product) : Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`

    return this.httpClient.put<Product>(url,product)
  }

  delete (id : number) : Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Product>(url);
  }
}

// delete (id : string) : Observable<Product>{
//   const url = `${this.baseUrl}/${id}`;
//   return this.httpClient.delete<Product>(url);
// } se fosse deixar como string, teria que chamar assim no component.ts, fazendo a interpolação:
// this.productService.delete(`${this.product.id}`).subscribe(()=>{
