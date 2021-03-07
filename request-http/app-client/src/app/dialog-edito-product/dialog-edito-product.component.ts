import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../model/Product';

@Component({
  selector: 'app-dialog-edito-product',
  templateUrl: './dialog-edito-product.component.html',
  styleUrls: ['./dialog-edito-product.component.css']
})
export class DialogEditoProductComponent implements OnInit {
  
  // informaçoes para ediçao de produtos
  product: Product = { id: 0, name: '', description: '', price: 0};

  constructor(
        public dialogRef: MatDialogRef<DialogEditoProductComponent>,
        @Inject(MAT_DIALOG_DATA) public p: Product
  ) { 
     this.product = p;
  }

  ngOnInit() {
  }
  
  // funçao que vai fechar o dialog
  cancel() {
    this.dialogRef.close();
  }

}
