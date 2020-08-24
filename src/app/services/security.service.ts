import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { LoginDTO } from '../domain/login';
import { HOST_BACKEND} from '../domain/constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root',
})

export class SecurityService {
 

  urlLogin: string = `${HOST_BACKEND}/poll-service/api/security/login`;
  
  constructor(
    private http: HttpClient,
    private router: Router)  { }

  login(login: LoginDTO){
    console.log("TEST LOG");
    console.log(httpOptions.headers);
    console.log(JSON.stringify({username: login.username, password: login.password}));
    
    return this.http.post(`${this.urlLogin}`, JSON.stringify({username: login.username, password: login.password}), { headers: httpOptions.headers});    
  }
}
