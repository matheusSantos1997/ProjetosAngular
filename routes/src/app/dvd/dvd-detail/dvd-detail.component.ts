import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dvd } from 'src/app/models/Dvd';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-dvd-detail',
  templateUrl: './dvd-detail.component.html',
  styleUrls: ['./dvd-detail.component.css']
})
export class DvdDetailComponent implements OnInit {

  dvd$: Observable<Dvd>;
  title = null; // parametro opcional

  constructor(private route: ActivatedRoute, // para capturar um parametro de rota
              private dvdService: DvdService,
              private router: Router) { } // para adicionar uma rota

  ngOnInit() {
     // retornando um indice de uma rota
     let index: number = +this.route.snapshot.paramMap.get('index');
     this.dvd$ = this.dvdService.getDvd(index);
     this.route.paramMap.subscribe((params: ParamMap) => { 
         // se está recebendo o titulo como parametro
         if (params.has('title')) {
           this.title = params.get('title');
         }
     });
     
     // console.log("Index: ", this.route.snapshot.paramMap.get('index'));
     // this.route.paramMap.subscribe((params: ParamMap) => console.log("Index: ", params.get('index')));
  }

  goBack() {
      // this.router.navigate(['/dvds']);
      this.router.navigateByUrl('/dvds');

  }

}
