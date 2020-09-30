import {catchError, retry} from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

const apiUrl = 'http://localhost:8080/country';

@Injectable({
  providedIn: 'root'
})
export class ListCountryService {

  constructor(private http: HttpClient, private keycloak: KeycloakService) { }

  getCountries(): Observable<any> {
    
    return this.http.get<any[]>(apiUrl).pipe(
      catchError(this.handleError<any[]>('getCountries')));
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