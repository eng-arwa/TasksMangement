import { Injector } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
export let inject:Injector
export const customGuard: CanActivateFn = (route, state) => {

  let router = inject.get(Router);

  router.navigate(['/login'])
  return true;
};
