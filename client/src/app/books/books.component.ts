import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Observable } from 'rxjs';
import { book } from '../types/book';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks()
    
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books$ = this.bookService.getBooks();
          this.toasterService.success('Book deleted successfully!');
        },
        error: (err) => {
          this.toasterService.error('Failed to delete book!');
          console.log(err);
        }
      });
    }
  }
}
