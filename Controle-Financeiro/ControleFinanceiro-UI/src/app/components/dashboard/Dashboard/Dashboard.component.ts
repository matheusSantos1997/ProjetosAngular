import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/AuthGuard.service';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAdministrador: boolean;

  constructor(private authGuard: AuthGuardService) { }

  ngOnInit(): void {
      this.isAdministrador = this.authGuard.verificarAdministrador();
  }

}
