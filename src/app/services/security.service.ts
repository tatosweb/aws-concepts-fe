import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Login } from '../domain/login';
import { HOST_BACKEND} from '../domain/constants';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {


  urlLogin: string = `${HOST_BACKEND}/poll-service/api/security/login`;
  
  constructor(
    private http: HttpClient,
    private router: Router)  { }

  login(login: Login){
    return this.http.post(`${this.urlLogin}`, login);
  }
}
