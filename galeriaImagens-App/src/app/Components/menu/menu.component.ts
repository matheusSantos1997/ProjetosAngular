import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  emailUsuarioLogado = localStorage.getItem('EmailUsuarioLogado');

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {

  }

  logout(): void {
    this.usuarioService.logout();
    this.router.navigateByUrl('usuario/login');
  }


}
