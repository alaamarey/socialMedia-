import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  //  observable<boolen , urlTree> او  urlTree  بيرجع ترو او فلس او


  const router = inject(Router); 
  
  if (  localStorage.getItem('token') ) {
    return true;
  }
  return  router.parseUrl('login')   ;







};
