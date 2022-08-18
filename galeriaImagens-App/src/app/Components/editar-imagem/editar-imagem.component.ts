import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagemService } from 'src/app/services/imagem.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Imagem } from 'src/app/Models/Imagem';

@Component({
  selector: 'app-editar-imagem',
  templateUrl: './editar-imagem.component.html',
  styleUrls: ['./editar-imagem.component.css']
})
export class EditarImagemComponent implements OnInit {

  formularioEditar: FormGroup;
  imagemId: number;
  imagem: string;
  file: File;
  imagemAnterior: Imagem;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private ImagemService: ImagemService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.imagemId = +this.route.snapshot.paramMap.get('id');

        this.ImagemService.getImagemById(this.imagemId).subscribe((resultado) => {
          this.imagemAnterior = resultado;
          this.imagem = `http://localhost:5000/Images/${this.imagemAnterior.nome}`
          // console.log(this.imagemAnterior);

          this.formularioEditar = this.fb.group({
           id: new FormControl(resultado.id),
           URLImagem: new FormControl(resultado.URLImagem, [Validators.required]),
           usuarioId: new FormControl(resultado.usuarioId)
         });
       });
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
     // console.log(event)
  }

  salvarImagem() {
    if(this.file !== null) {
      const formData: FormData = new FormData();
      formData.append('file', this.file, this.file.name);

    this.ImagemService.putUpload(this.imagemId, formData).subscribe((response) => {
      const dadosRegistro: Imagem = new Imagem();
      dadosRegistro.URLImagem = response.URLImagem;
      this.router.navigate(['/imagens'])

      this.snackBar.open('upload atualizado com sucesso', null, {
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
    })
  }

  }

  voltarListagem(): void{
    this.router.navigate(['/imagens']);
  }

}
