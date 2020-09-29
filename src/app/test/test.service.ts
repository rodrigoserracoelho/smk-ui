import {catchError, retry} from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getLicenses(apiUrl: string): Observable<any> {
    return this.http.get<any[]>(apiUrl).pipe(
      catchError(this.handleError<any[]>('getLicenses')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error);
    };
  }
}