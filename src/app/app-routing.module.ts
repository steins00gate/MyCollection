import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'agregar-articulo',
    loadChildren: () => import('./pages/agregar-articulo/agregar-articulo.module').then( m => m.AgregarArticuloPageModule)
  },
  {
    path: 'categorias-coleccion',
    loadChildren: () => import('./pages/categorias-coleccion/categorias-coleccion.module').then( m => m.CategoriasColeccionPageModule)
  },
  {
    path: 'lista-de-deseos',
    loadChildren: () => import('./pages/lista-de-deseos/lista-de-deseos.module').then( m => m.ListaDeDeseosPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

