import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router'
import { provideClientHydration } from '@angular/platform-browser'
import { provideHttpClient, withFetch } from '@angular/common/http'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideClientHydration(),
    provideHttpClient(withFetch())
  ]
}
