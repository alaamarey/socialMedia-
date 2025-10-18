import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { headerInterceptor } from '../core/interceptor/header-interceptor';
import { loadingInterceptor } from '../core/interceptor/loading-interceptor';
import { routes } from './app.routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from '../core/interceptor/error-interceptor';
import { provideToastr } from 'ngx-toastr'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, loadingInterceptor, errorInterceptor])),
    importProvidersFrom(NgxSpinnerModule),
    provideAnimations(),
    provideToastr()


  ]
};
