import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id:0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    let convertId = parseInt(id!);
    this.pensamentoService.listarPensamentoPorId(convertId).subscribe((response) => {
        this.pensamento = response;
    })
  }

  excluirPensamento(){
    if(this.pensamento.id && this.pensamento.id !== undefined) {
      this.pensamentoService.excluirPensamento(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
     }, (error) => {
        console.error(error);
     })
    }
  }

  cancelarPensamento(){
     this.router.navigate(['/listarPensamento'])
  }

}
