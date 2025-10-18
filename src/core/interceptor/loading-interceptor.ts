import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const ngxSpinnerService = inject(NgxSpinnerService)
  const showSpinner = !req.headers.has('no-spinner');

  
  if (showSpinner)
    ngxSpinnerService.show();

  return next(req).pipe(
    finalize(function () {
      if (showSpinner)
        ngxSpinnerService.hide();
    }
    )
  );
};
