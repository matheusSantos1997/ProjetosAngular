import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {
  
  // gera um objeto
  clientForm = new FormGroup({
       firstName: new FormControl(''),
       lastName: new FormControl(''),
      name: new FormGroup({
         firstName: new FormControl(''),
         lastName: new FormControl('')
         
      })
  });

  constructor() { }

  ngOnInit() {
  }

  submit() {
      const form = this.clientForm.value;
      console.log(form);
  }

}
