import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HandleErrorInterceptor } from './interceptors/handle-error.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
  ,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleErrorInterceptor,
      multi:true
    }
  ]
})
export class CoreModule { }
