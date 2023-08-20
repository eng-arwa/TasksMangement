import { CanActivateFn } from '@angular/router';

export const customGuard: CanActivateFn = (route, state) => {
  return true;
};
