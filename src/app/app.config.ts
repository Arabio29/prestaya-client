import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ClienteService } from './services/Cliente.service'

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './guard/authinterceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideHttpClient(),
              provideClientHydration(),
              { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
            ]
};
