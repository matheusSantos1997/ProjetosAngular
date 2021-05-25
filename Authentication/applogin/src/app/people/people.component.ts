import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people$: Observable<Person[]>;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
      this.getAllPeople();
  }

  getAllPeople() {
     this.people$ = this.peopleService.getPeople();
  }

}
