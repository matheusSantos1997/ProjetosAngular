import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Department } from '../models/Department';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: string = '';
  departments: Department[];
  private unsubscribe$: Subject<any> = new Subject()
  depEdit: Department = null;

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.departmentService.getDepartments()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (deps) => {
            this.departments = deps
          }, (err) => {
         console.error(err);
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  save() {
     // se estiver no modo ediçao
     if (this.depEdit) {
        this.departmentService.updateDepartment({ name: this.depName, _id: this.depEdit._id})
                              .subscribe(
                                 (dep) => {
                                     this.notify('Update success!');
                                 }, (err) => {
                                    this.notify('Error!');
                                    console.error(err);
                                 }
                              );
     } else {
        this.departmentService.addDepartment({name:this.depName})
        .subscribe(
          (dep) => {
             console.log(dep);
             this.clearFields();
             this.notify('inserted success!');
          }, (err) => {
             this.notify('Error!');
             console.error(err);
          }
       );
     }
  }

  clearFields() {
    this.depName = '';
    this.depEdit = null;
  }

  cancel() {

  }

  editDep(dep: Department) {
     this.depName = dep.name;
     this.depEdit = dep;
  }

  deleteDep(dep: Department) {
      this.departmentService.deleteDepartment(dep)
          .subscribe(
             () => {
               this.notify('Removed!')
             }, (err) => {
                console.error(err);
             }
          )
  }

  notify(msg: string) {
       this.snackBar.open(msg, 'Ok', {duration: 3000});
  }

}
