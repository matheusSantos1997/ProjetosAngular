import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['../Dashboard/Dashboard.component.css']
})
export class HeaderComponent implements OnInit {

  emailUsuarioLogado = localStorage.getItem('EmailUsuarioLogado');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  efetuarLogout(): void {
     localStorage.clear();
     this.router.navigate(['usuarios/loginusuario']);
  }

}
