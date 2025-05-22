import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Observable } from 'rxjs';
import { book } from '../types/book';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
  
  books$!:Observable<book[]>
  bookService = inject(BooksService);
index: any;

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks()
    
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        // Refresh the list after deletion
        this.books$ = this.bookService.getBooks();
      },
      error: (err) => console.log(err)
    });
  }
}
