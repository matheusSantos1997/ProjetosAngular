import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Usuario } from 'src/app/Models/Usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // emailUsuarioLogado = localStorage.getItem('EmailUsuarioLogado');
  user$: Observable<Usuario>;

  constructor(private usuarioService: UsuarioService, private router: Router) {
      this.user$ = this.usuarioService.getUser();
  }

  ngOnInit(): void {

  }

  efetuarLogout(): void {
     this.usuarioService.logout();
     this.router.navigateByUrl('usuario/login');
  }

}
