import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { CountryComponent } from './pages/country/country.component'
import { GamesComponent } from './pages/games/games.component'

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
    component: GamesComponent,
    loadChildren: () => import('./games/games.routes').then(m => m.routes)
  }
]
