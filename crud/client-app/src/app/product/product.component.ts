import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Department } from '../models/Department';
import { Product } from '../models/Product';
import { DepartmentService } from '../services/department.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup = this.fb.group({
      _id: [null],
      name: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      departments: [[], [Validators.required]]
  });

  @ViewChild('form', { static: false}) form: NgForm;

  products: Product[];
  departments: Department[];
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
      this.productService.getProducts()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((prods) => this.products = prods);
      this.departmentService.getDepartments()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((deps) => this.departments = deps);
  }

  onlyNumber(e: any) {
    let charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0   
        // charCode 57 equivale a 9
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
  }

  save() {
    // pegando o valor do objeto salvo na hora de inserir um novo produto
    let data = this.productForm.value;
    if(data._id !== null) {
        this.productService.updateProducts(data)
            .subscribe();
     } else {
         this.productService.postProduct(data)
             .subscribe();  
     }
    // console.log(data)
    this.resetForm();

  }

  delete(prod: Product) {
      this.productService.deleteProduct(prod)
          .subscribe(
            () => { 
              this.notify('Deleted!');
            }, (err) => {
                console.error(err);
            }
          );
  }

  edit(prod: Product) {
     this.productForm.setValue(prod);
  }

  notify(msg: string) {
       this.snackBar.open(msg, 'Ok', { duration: 3000});
  }

  resetForm() {
    // this.productForm.reset();
    this.form.resetForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

}
