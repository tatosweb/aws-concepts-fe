import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {User} from '../domain/user';
import { HOST_BACKEND} from '../domain/constants';


@Injectable({
  providedIn: 'root'
})

export class UserService {


  apiURL: string = `${HOST_BACKEND}/poll-service/api/v1`;
  
  constructor(protected http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 


  // HttpClient API get() method => Fetch users list
  getUsers(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/polls`)
     .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   // HttpClient API get() method => Fetch user
   getUser(id): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/poll/` + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

    // HttpClient API post() method => Create user
  createUser(user): Observable<User> {
     console.log( JSON.stringify(user));
      return this.http.post<User>(`${this.apiURL}/poll`, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // HttpClient API put() method => Update user
  updateUser(id, user): Observable<User> {
    return this.http.put<User>(`${this.apiURL}/poll/` + id, JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
