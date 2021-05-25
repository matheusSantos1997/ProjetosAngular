import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
     this.getAllProduct();
  }

  getAllProduct() {
     this.products$ = this.productService.getProducts();
  }

}
