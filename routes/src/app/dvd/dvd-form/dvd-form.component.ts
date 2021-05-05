import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-dvd-form',
  templateUrl: './dvd-form.component.html',
  styleUrls: ['./dvd-form.component.css']
})
export class DvdFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dvdService: DvdService,
    private router: Router) { }

  formDvd = this.fb.group({
     title: [''],
     year: [''],
     genre: ['']
  });

  ngOnInit() {

  }

  onSubmit() {
      this.dvdService.addDvd(this.formDvd.value);
      this.router.navigateByUrl('/dvds'); 
      // this.router.navigate(['/dvds']);
  }

  goBack() {
    this.router.navigateByUrl('/dvds');
  }

}
