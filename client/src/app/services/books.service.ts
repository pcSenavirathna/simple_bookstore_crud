import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { book } from '../types/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  apiUrl = 'http://localhost:5261/api/book';

  constructor(private  http:HttpClient) { }

  getBooks =():Observable<book[]> => this.http.get<book[]>(this.apiUrl);

  addBook = (data:book) => this.http.post(this.apiUrl, data)

  getBookMethod = (id:number):Observable<book> => this.http.get<book>(this.apiUrl + '/' + id);
  
  updateBook(id: number, book: any) {
    return this.http.put(`http://localhost:5261/api/book/${id}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete(`http://localhost:5261/api/book/${id}`);
  }
}
