import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AppModule { }
