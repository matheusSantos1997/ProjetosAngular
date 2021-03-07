import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './model/Product';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogEditoProductComponent } from './dialog-edito-product/dialog-edito-product.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  simpleReqProductsObs$: Product[];
  productsLoading: Product[];
  bLoading: boolean = false;
  productsIds: Product[];
  newProducts: Product[];
  productsToDelete: Product[];
  productsToEdit: Product[];
  formGroup: FormGroup;


  constructor(private fb: FormBuilder, 
              private productsService: ProductsService, 
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {}

  ngOnInit() {
       this.validation();
  }

  getSimpleHttpRequest() {
      this.productsService.getProducts().subscribe((p) => {
        this.simpleReqProductsObs$ = p;
        console.log(p);
      });
  }

  getProductsLoading() {
       this.bLoading = true;
       this.productsService.getProducts()
           .pipe(delay(2000))
           .subscribe((p) => {
               this.productsLoading = p;
               this.bLoading = false;
            }, (error) => {
               console.error(error);
               this.bLoading = false;
            }
          );
  }
  cleanHttpRequest() {
     this.productsLoading = null;
     this.bLoading = false;
  }

  getProductsIds() {
     this.productsService.getProductsIds()
         .subscribe((ids) => {
             this.productsIds = ids.map(id => ({id: id, name: '', description: '', price: 0}))
         });
  }

  loadName(id: number) {
       this.productsService.getProductName(id)
           .subscribe((name)=> {
              let index = this.productsIds.findIndex(p => p.id === id);
              if(index >= 0) {
                this.productsIds[index].name = name;
              }
           }
              
           );
  }

  validation(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
   });
  }

  saveProduct() {

      this.productsService.insertProduct(this.formGroup.value).subscribe(
        (itemCadastrado) => {
           console.log(itemCadastrado);
           this.snackBar.open('cadastrado com sucesso!');
           location.reload();
        },
        (error) => {
           console.error(error);
        }
      );
    }

    loadeProductToDelete() {
        this.productsService.getProducts().subscribe(
          (prods) => this.productsToDelete = prods
        );
    }
    
    // excluindo os produtos
    deleteProduct(p: Product) {
         this.productsService.deleteProduct(p).subscribe(
             (res) => {
                let i = this.productsToDelete.findIndex(prod => p.id == prod.id);
                if (i >= 0) {
                   this.productsToDelete.splice(i, 1);
                }
             }, (err) => {
                console.error(err);
             }
          );
    }

    loadeProductToEdit() {
        this.productsService.getProducts().subscribe(
           (prods) => this.productsToEdit = prods
        );
    }

    editProduct(p: Product) {
        // vai criar uma nova referencia do produto
        let newProduct: Product = Object.assign({}, p);

        let dialogRef = this.dialog.open(DialogEditoProductComponent, { width: '400px', data: newProduct });
        dialogRef.afterClosed().subscribe(
           (res: Product) => {
              // console.log(res);
              // verifica se a resposta onde recebe os valores é diferente de undefined
              if(res) {
                 this.productsService.editProduct(res)
                     .subscribe(
                        (resp) => {
                            let i = this.productsToEdit.findIndex(prod => p.id == prod.id);
                            if (i >= 0) {
                               this.productsToEdit[i] = resp; 
                            }
                        },
                        (err) => {
                            console.error(err);
                        }
                     )
              }
           }
        )
        
        

    }

}
