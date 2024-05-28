import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ClienteService } from './services/Cliente.service'

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideHttpClient(),
              provideClientHydration()]
};
