import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book$: Observable<Book> = null;
  index: number;
  authors: string[];

  constructor(
     private route: ActivatedRoute,
     private bookService: BookService,
     private router: Router
  ) { }

  ngOnInit() {
     // console.log('Index: ', this.route.snapshot.paramMap.get('index')); // é chamado apenas uma vez
     this.book$ = this.route.paramMap
     .pipe(tap((params: ParamMap) => this.index = +params.get('index')), 
           switchMap((params: ParamMap) => this.bookService.getBook(+params.get('index') )),
           tap((b) => this.authors = b ? b.authors : []));
     
     // subscribe((params: ParamMap) => );
  }

  remove() {
      this.bookService.removeBook(this.index);
      this.router.navigateByUrl('/books');
  }

  goAuthor() {
     let url = '/books/' + this.index + '/authors';
     this.router.navigate([url, { authors: this.authors}]);
  }

}
