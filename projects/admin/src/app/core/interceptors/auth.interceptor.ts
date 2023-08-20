import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest:any;
    if (localStorage.getItem('token')) {
       newRequest = request.clone({
        headers: request.headers.append('Authorization', localStorage?.getItem('token')!)
          
      })
    }
    return localStorage.getItem('token')? next.handle(newRequest): next.handle(request) ;
    // return next.handle(newRequest) ;
  }
}
