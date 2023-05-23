import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  formulario!: FormGroup;

  constructor(private pensamentoService: PensamentoService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
     const id = this.route.snapshot.paramMap.get('id');

     let idConvert = parseInt(id!);

     this.pensamentoService.listarPensamentoPorId(idConvert).subscribe((response) => {
        // this.pensamento = response;
        this.formulario = this.fb.group({
           id: new FormControl(response.id),
           conteudo: new FormControl(response.conteudo, [Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)]),
           autoria: new FormControl(response.autoria, [Validators.required, Validators.minLength(3)]),
           modelo: new FormControl(response.modelo, [Validators.required]),
           favorito: new FormControl(response.favorito)
        })
     })
  }

  editarPensamento(){
    if(this.formulario.valid){
      this.pensamentoService.editarPensamento(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      })
    }
  }

  cancelar() {
      this.router.navigate(['/listarPensamento']);
  }

}
