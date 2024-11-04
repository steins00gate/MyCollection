import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasColeccionPage } from './categorias-coleccion.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasColeccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasColeccionPageRoutingModule {}
