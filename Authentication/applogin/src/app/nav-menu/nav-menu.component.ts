import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  authenticated$ : Observable<boolean>;
  user$: Observable<User>;

  constructor(private authService: AuthService, 
              private router: Router) { 
                     this.authenticated$ = this.authService.isAuthenticated();
                     this.user$ = this.authService.getUser();
              }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
