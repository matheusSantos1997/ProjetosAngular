import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Imagem } from 'src/app/Models/Imagem';
import { ImagemService } from 'src/app/services/imagem.service';

@Component({
  selector: 'app-cadastrar-imagem',
  templateUrl: './cadastrar-imagem.component.html',
  styleUrls: ['./cadastrar-imagem.component.css']
})
export class CadastrarImagemComponent implements OnInit {

  formulario: FormGroup;
  file: File;
  usuarioId: any = localStorage.getItem('UsuarioId');

  constructor(private fb: FormBuilder,
              private router: Router,
              private imagemService: ImagemService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      URLImagem: new FormControl(null, [Validators.required]),
      usuarioId: new FormControl(this.usuarioId)
    })
  }

  onFileChange(event: any) {
    this.file = event.target.files[0] as File;

      const reader = new FileReader();

      if(this.file.type !== 'image/jpeg' && this.file.type !== 'image/png') {
        this.snackBar.open("Formato inválido", null, {
          duration: 2000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      } else {
        reader.onload = (e: any) => {
          document.getElementById('foto').removeAttribute('hidden'); // remove o atributo hidden
          document.getElementById('foto').setAttribute('src', e.target.result); // seta a imagem
        }

      }

      reader.readAsDataURL(this.file)

      // console.log(this.file)
  }

  salvarImagem() {
     const formData: FormData = new FormData();

      // verifica se a imagem é diferente de nula
      if(this.file !== null) {
        formData.append('file', this.file, this.file.name); // adiciona ao formData
      }

     this.imagemService.postUpload(formData).subscribe((response) => {
      const dadosRegistro: Imagem = new Imagem();
       dadosRegistro.URLImagem = response.URLImagem

       this.router.navigate(['/imagens'])

      this.snackBar.open('upload feito com sucesso', null, {
        duration: 2000,
        panelClass: ['snackbar-success'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
     }, (error) => {
         if(error.status === 400) {
          this.snackBar.open("apenas .jpg ou .png", null, {
            duration: 2000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
         }
     });

  }

  voltarListagem(): void{
    this.router.navigate(['/imagens']);
  }

}
