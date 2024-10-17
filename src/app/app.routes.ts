import { Routes } from '@angular/router'
import { HomeComponent } from './modules/countries/pages/home/home.component'
import { CountryComponent } from './modules/countries/pages/country/country.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'country/:id',
    component: CountryComponent
  },
  {
    path: 'games',
    loadChildren: () => import('./modules/games/games.routes').then(m => m.routes)
  }
]
