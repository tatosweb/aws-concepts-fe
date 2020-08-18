import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {User} from '../domain/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {

    // Define API
    //apiURL = 'http://myBalancerCf-2112786308.us-east-1.elb.amazonaws.com';
    apiURL = 'https://xvlwbfkz9f.execute-api.us-east-1.amazonaws.com/prod'
    //apiURL = 'https://7c35b42c8d19.ngrok.io/poll-service/api/v1'


  constructor(protected http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 


  // HttpClient API get() method => Fetch users list
  getUsers(): Observable<User> {
    return this.http.get<User>(this.apiURL+'/poll-service/api/v1/polls')
     .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   // HttpClient API get() method => Fetch user
   getUser(id): Observable<User> {
    return this.http.get<User>(this.apiURL +'/poll-service/api/v1/poll/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

    // HttpClient API post() method => Create user
  createUser(user): Observable<User> {
     console.log( JSON.stringify(user));
      return this.http.post<User>(this.apiURL +'/poll-service/api/v1/poll', JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // HttpClient API put() method => Update user
  updateUser(id, user): Observable<User> {
    return this.http.put<User>(this.apiURL + '/poll-service/api/v1/poll/' + id, JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete user
  deleteUser(id){
    return this.http.delete<User>(this.apiURL + '/' + id, this.httpOptions)
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
