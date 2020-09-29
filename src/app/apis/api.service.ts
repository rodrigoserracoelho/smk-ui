import {catchError, retry} from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const apiUrl = 'https://localhost:8080/route';
/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};*/

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getApis(): Observable<any> {
    return this.http.get<any[]>(apiUrl).pipe(
      catchError(this.handleError<any[]>('getApis')));
  }

  postApi(api: any): Observable<any> {
    console.log("CALLING API");
    return this.http.post<any[]>(apiUrl, api).pipe(
    catchError(this.handleError<any[]>('postApi')));
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