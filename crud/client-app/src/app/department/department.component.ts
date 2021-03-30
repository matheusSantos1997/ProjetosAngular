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
    // listando os departamentos
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

  // insere ou atualiza o departamento
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
        // salva um novo departamento
        this.departmentService.addDepartment({name:this.depName})
        .subscribe(
          (dep) => {
             console.log(dep);
             this.notify('inserted success!');
          }, (err) => {
             this.notify('Error!');
             console.error(err);
          }
       );
     }
     this.clearFields();
  }

  clearFields() {
    this.depName = '';
    this.depEdit = null;
  }

  cancel() {
     this.clearFields();
  }
  
  // carrega a ediçao do departamento
  editDep(dep: Department) {
     this.depName = dep.name;
     this.depEdit = dep;
  }

  // deleta o departamento
  deleteDep(dep: Department) {
      this.departmentService.deleteDepartment(dep)
          .subscribe(
             () => {
               this.notify('Removed!')
             }, (err) => {
                this.notify(err.error.msg);
                // console.log(err);
             }
          )
  }

   // funçao para gerar uma mensagem de notificaçao com o snackBar
  notify(msg: string) {
       this.snackBar.open(msg, 'Ok', {duration: 3000});
  }

}
