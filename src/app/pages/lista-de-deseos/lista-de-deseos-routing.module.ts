import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDeDeseosPage } from './lista-de-deseos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDeDeseosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDeDeseosPageRoutingModule {}
