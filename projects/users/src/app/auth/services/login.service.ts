import { Injectable } from '@angular/core';
import { login, register } from '../model/DoTS';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/users/src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
   private http:HttpClient

  ) { }
  register(model: register) {
    
    return this.http.post(environment.baseurl + 'auth/createAccount', model);
    
  }
  login(model: login) {
    
    return this.http.post(environment.baseurl + 'auth/login', model);
    
  }
}
