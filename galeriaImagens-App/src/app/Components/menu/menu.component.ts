import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  emailUsuarioLogado: any = localStorage.getItem('EmailUsuarioLogado');

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  efetuarLogout(): void {
     localStorage.clear();
     this.router.navigateByUrl('usuario/login');
     location.reload();
  }

}
