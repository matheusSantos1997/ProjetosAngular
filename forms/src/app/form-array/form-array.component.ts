import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  clientForm = this.fb.group({
       firstName: [''],
       lastName: [''],
       address: this.fb.group({
           street: [''],
           city: [''],
           state: ['']
       }),
       phones: this.fb.array(['']),
       children: this.fb.array([])
  });

  phones = this.clientForm.get('phones') as FormArray;

  children = this.clientForm.get('children') as FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    
  }

  onSubmit() {
     console.log(this.clientForm.value);
  }

  addPhone() {
      this.phones.push(this.fb.control(''));
  }

  deletePhone() {
    // this.phones.clear(); // exclui todos de uma vez
    let index = this.fb.control('');
    this.phones.removeAt(index[0]); // remove apenas 1 
  }

  addChild() {
      this.children.push(
         this.fb.group({
            name: this.fb.control(''),
            age: this.fb.control('')
         })
      )
  }

  deleteChild() {
     let index = this.fb.group({ name: this.fb.control(''), age: this.fb.control('') });
     this.children.removeAt(index[0]);
  }

}
