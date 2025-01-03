import { Routes } from '@angular/router';
import { Component01Component } from './component01/component01.component';

export const routes: Routes = [
  {
    component: Component01Component, path: 'teste',
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'teste'
  }
];
