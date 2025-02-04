import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { routes } from './app.routes';
import { HttpHeaderTokenInterceptorService } from './interceptors/http-header-token-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // Use Class interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderTokenInterceptorService,
      multi: true,
    },
  ],
};
