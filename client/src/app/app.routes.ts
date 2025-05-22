import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookFormComponent } from './books/book-form/book-form.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/books', pathMatch: 'full' },
	{
		path: 'books',
		component: BooksComponent
	},
	{
		path: 'books/:id',
		component: BookFormComponent
	},
	{
		path: 'book/form',
		component: BookFormComponent
	}
];
