import { Component, OnInit } from '@angular/core';

interface Client {
   firstName: string;
   lastName: string;
   birth: Date;
   gender: string;
   street: string;
   city: string;
   state: string;
   phone1: string;
   phone2: string; 
  }

@Component({
  selector: 'app-templateDrivenForm',
  templateUrl: './templateDrivenForm.component.html',
  styleUrls: ['./templateDrivenForm.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {

  client: Client = {
     firstName: '',
     lastName: '',
     birth: new Date(),
     gender: '',
     street: '',
     city: '',
     state: '',
     phone1: '',
     phone2: ''

  }

  states = ['SP', 'PR', 'SC', 'RS', 'PA', 'RO', 'MA'];

  constructor() { }

  ngOnInit() {
  }
  
  formSubmit() {

    console.log(this.client);

  }
}
