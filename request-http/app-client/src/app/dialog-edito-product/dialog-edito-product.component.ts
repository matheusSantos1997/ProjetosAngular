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

  onlyNumbers(e: any) {
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
  
  // funçao que vai fechar o dialog
  cancel() {
    this.dialogRef.close();
  }

}
