import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  bookformSubscription?: Subscription;
  paramsSubscription?: Subscription;
  bookService = inject(BooksService);
  isEdit = false;
  bookId?: number;

  constructor(private fb: FormBuilder, private activatedRouter: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publicationDate: ['', Validators.required],
    });

    this.paramsSubscription = this.activatedRouter.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.bookId = +params['id'];
        this.bookService.getBookMethod(this.bookId).subscribe({
          next: (book) => {
            this.form.patchValue(book);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.bookformSubscription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
  }

  onSubmit() {
    if (this.isEdit && this.bookId) {
      // Update
      this.bookformSubscription = this.bookService.updateBook(this.bookId, this.form.value).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.log(err)
      });
    } else {
      // Add
      this.bookformSubscription = this.bookService.addBook(this.form.value).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.log(err)
      });
    }
  }
}
