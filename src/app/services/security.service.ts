import { Injectable } from '@angular/core';
import { HttpClient, Headers } from '@angular/common/http';
import { Router } from '@angular/router';
//import {Http, Headers} from 'angular2/http';

import { LoginDTO } from '../domain/login';
import { HOST_BACKEND} from '../domain/constants';

const headers = new Headers();
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  headers.append('Access-Control-Allow-Methods', 'GET');
  headers.append('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root',
})

export class SecurityService {


  urlLogin: string = `${HOST_BACKEND}/poll-service/api/security/login`;
  
  constructor(
    private http: HttpClient,
    private router: Router)  { }

  login(login: LoginDTO){
    return this.http.post(`${this.urlLogin}`, JSON.stringify({username: login.username, password: login.password}), { headers: headers});    
  }
}
