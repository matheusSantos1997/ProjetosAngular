import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Department } from '../models/Department';
import { delay, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

url: string = 'http://localhost:3000/departments'; // url de consumo da API

// behaviorSubject retorna o ultimo registro
private departmentSubject$: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(null);

// para saber se já foi carregado
private loaded: boolean = false;

constructor(private http: HttpClient) { }

// service de retorno de todos os departamentos
getDepartments(): Observable<Department[]> {
    // se nao for carregado ainda
    if(!this.loaded) {
        this.http.get<Department[]>(this.url)
                 .pipe(
                     tap(deps => console.log(deps)),
                     delay(1000)
                     )
                 .subscribe(this.departmentSubject$);
        this.loaded = true;
    } 
    // retorna e um observable do proprio subject de departmentSubject$
    return this.departmentSubject$.asObservable();
}

// service que adiciona novos departamentos
addDepartment(d: Department): Observable<Department> {
    return this.http.post<Department>(this.url, d) // recebe o departamento no post
                    .pipe(
                        tap(
                            // atualiza a lista de departamentos inseridos
                            (dep: Department) => this.departmentSubject$.getValue().push(dep) 
                           )
                    );
}

// service que vai deletar um departamento
deleteDepartment(dep: Department): Observable<any> {
    return this.http.delete(`${this.url}/${dep._id}`)
                    .pipe(tap(() => {
                          let departments = this.departmentSubject$.getValue(); // retorna a lista de dapartamentos
                          let i = departments.findIndex(d => d._id === dep._id); // procura o indice do departamento
                          // se encontrou um indice do id para deletar
                          if(i>=0) {
                              departments.splice(i, 1); // apaga um elemento a partir do indice
                          }
                    }))
}

// service que vai atualizar um departamento
updateDepartment(dep: Department): Observable<Department> {
     return this.http.put<Department>(`${this.url}/${dep._id}`, dep)
                     .pipe(
                         tap((dep) => { // objeto alterado que é recebido do servidor
                             let departments = this.departmentSubject$.getValue();
                             let i = departments.findIndex(d => d._id === dep._id);
                             if(i>=0) {
                                 departments[i].name = dep.name;
                             }
                         })
                     )
}

}
