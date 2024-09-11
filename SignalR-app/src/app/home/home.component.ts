
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { FormControl } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NameDialogComponent } from './name-dialog/name-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messages: Message[] = [];

  messageControl = new FormControl('');
  userName: string;
  private userSnackBarShown = false; // Flag para evitar duplicidade

  connection = new signalR.HubConnectionBuilder()
                          .withUrl("http://localhost:5066/chat")
                          .build();

  constructor(public dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              public snackBar: MatSnackBar) {
      this.openDialog();
  }

  ngOnInit(): void {
    console.log(this.messages);
  }

  openDialog(){
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '256px',
      data: this.userName,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && !this.userSnackBarShown) { // Verifica se já mostramos o snackbar
        this.userName = result;
        this.startConnection();
        this.openSnackBar(result);
        this.userSnackBarShown = true; // Marca que o snackbar já foi exibido
      }
    })
  }

  openSnackBar(userName: string){
    const message = userName === this.userName ? "Você entrou na sala" : `${userName} acabou de entrar`;
     this.snackBar.open(message, "Fechar", {
       duration: 5000,
       horizontalPosition: 'right',
       verticalPosition: 'top'
     });
  }

  startConnection(){
     this.connection.on("newMessage", (userName: string, message: string) => {
        this.messages.push({
          text: message,
          userName: userName
        });

        // Força a detecção de mudanças
        this.cdr.detectChanges();
     });

     this.connection.on("newUser", (userName: string) => {
      if (userName !== this.userName) { // Evita duplicidade para o próprio usuário
        this.openSnackBar(userName);
      }
     });

     this.connection.on("previousMessages", (messages: Message[]) => {
        this.messages = messages;
     });


     this.connection.start()
        .then(() => {
          this.connection.send("newUser", this.userName, this.connection.connectionId)
        });
  }

  sendMessage(){
      this.connection.send("newMessage", this.userName, this.messageControl.value)
      .then(() => {
        this.messageControl.setValue('');
      }).catch((error) => {
         console.error(error);
      });
  }

}
