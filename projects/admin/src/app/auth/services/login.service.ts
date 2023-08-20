import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../model/auth';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private htpp: HttpClient) {

  }
  
  login(model:login) {
    
    return this.htpp.post(environment.baseurl+'auth/login', model)
  }
}
