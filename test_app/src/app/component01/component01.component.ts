import { Component, inject, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-component01',
  standalone: true,
  imports: [AppModule],
  templateUrl: './component01.component.html',
  styleUrl: './component01.component.css'
})
export class Component01Component implements OnInit {

  private snackBar = inject(MatSnackBar);

  nome: string = 'Matheus';
  idade: number = 27;

  ngOnInit(): void {

  }

  action(e: any){
    this.snackBar.open('teste', '', {
      duration: 2000
     })
     console.log(e);
  }

}
