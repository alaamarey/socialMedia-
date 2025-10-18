import { CanDeactivateFn } from '@angular/router';

export const stayiftokenGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  
  if (localStorage.getItem('token')) {
    return false;   // block navigation  
  }
  return true;    // allow leaving
};
