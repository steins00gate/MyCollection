import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDeDeseosPageRoutingModule } from './lista-de-deseos-routing.module';

import { ListaDeDeseosPage } from './lista-de-deseos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDeDeseosPageRoutingModule
  ],
  declarations: [ListaDeDeseosPage]
})
export class ListaDeDeseosPageModule {}
