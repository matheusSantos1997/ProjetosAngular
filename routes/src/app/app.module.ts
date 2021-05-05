import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BookComponent } from './book/book.component';
import { DvdComponent } from './dvd/dvd.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './appRouting.module';
import { DvdDetailComponent } from './dvd/dvd-detail/dvd-detail.component';
import { DvdFormComponent } from './dvd/dvd-form/dvd-form.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { BookAuthorComponent } from './book/book-author/book-author.component';

// const appRoutes : Routes = [
//    { path:'dvds', component: DvdComponent },
//    { path:'books', component: BookComponent },
//    { path: '', pathMatch: 'full', redirectTo: 'dvds'},
//    { path: '**', component: PageNotFoundComponent }
// ]

@NgModule({
  declarations: [			
    AppComponent,
      BookComponent,
      DvdComponent,
      PageNotFoundComponent,
      DvdDetailComponent,
      DvdFormComponent,
      BookDetailComponent,
      BookAuthorComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
   // RouterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
