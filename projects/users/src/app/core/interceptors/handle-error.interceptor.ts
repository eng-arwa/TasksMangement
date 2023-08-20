import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  constructor(private _toastr: ToastrService,
    private _router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.message == "jwt expired") {
          localStorage.removeItem('token')
          this._router.navigate(['/login'])
              
        } else {
          this._toastr.error(error.error.message);

            }
         throw error
      })
    );
  }
}
