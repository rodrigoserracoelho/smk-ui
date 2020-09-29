import {catchError, retry} from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

//const localUrl = 'assets/data/smartphone.json';
//const apiUrl = 'https://localhost:8080/route';
//const apiUrl = "https://capigateway.eu:8380/gateway/test6/external/rodrigo";
const apiUrl = "https://localhost:8380/gateway/test6/external/rodrigo";

const camelRouteEndpoint = "https://localhost:8380/analytics/health";
const camelDeployedRoutes = "https://localhost:8380/analytics/camelroutes";
/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};*/

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getCamelRouteServerStatus(): Observable<any> {
    return this.http.get<any[]>(camelRouteEndpoint).pipe(
      catchError(this.handleError<any[]>('getCamelRouteServerStatus')));
  }

  getCamelDeployedRoutes(): Observable<any> {
    return this.http.get<any[]>(camelDeployedRoutes).pipe(
      catchError(this.handleError<any[]>('getCamelDeployedRoutes')));
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