import { Injector, inject } from '@angular/core';
import { CanActivateFn, Router,CanActivateChildFn } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  


  if(localStorage.getItem("token")){
    // inject(Router).navigate(['/task']);
  
    return true;
    
  }
  else {
    inject(Router).navigate(['/login']);
   
    return false
  }
    
};
