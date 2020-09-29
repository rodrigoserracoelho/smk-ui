import {catchError, retry} from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const apiUrl = 'https://localhost:8080/route';

@Injectable({
  providedIn: 'root'
})
export class ListApisService {

  constructor(private http: HttpClient) { }

  getApis(): Observable<any> {
    return this.http.get<any[]>(apiUrl).pipe(
      catchError(this.handleError<any[]>('getApis')));
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}