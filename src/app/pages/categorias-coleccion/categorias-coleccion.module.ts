import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasColeccionPageRoutingModule } from './categorias-coleccion-routing.module';

import { CategoriasColeccionPage } from './categorias-coleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriasColeccionPageRoutingModule
  ],
  declarations: [CategoriasColeccionPage]
})
export class CategoriasColeccionPageModule {}
