import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-de-deseos',
  templateUrl: './lista-de-deseos.page.html',
  styleUrls: ['./lista-de-deseos.page.scss'],
})
export class ListaDeDeseosPage {
  deseos: { nombre: string; comentarios: string }[] = [];
  nuevoDeseo = { nombre: '', comentarios: '' ,categoria: ''};
  cargando: boolean = false; 

  constructor(private alertController: AlertController) {
    const deseosGuardados = JSON.parse(sessionStorage.getItem('listaDeseos') || '[]');
    this.deseos = deseosGuardados;
  }

  async agregarDeseo() {
    if (this.nuevoDeseo.nombre && this.nuevoDeseo.categoria) { 
      this.cargando = true; 
      setTimeout(async () => {
        this.nuevoDeseo.categoria = this.nuevoDeseo.categoria.charAt(0).toUpperCase() + this.nuevoDeseo.categoria.slice(1); // Normaliza la categoría
        this.deseos.push({ ...this.nuevoDeseo });
        this.nuevoDeseo = { nombre: '', comentarios: '', categoria: '' }; 
        this.guardarDeseos();
        this.cargando = false; 
        await this.mostrarMensajeExito(); 
      }, 2000); 
    }
  }
  
  

  async mostrarMensajeExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Deseo agregado con éxito',
      buttons: ['Cerrar'],
    });
    await alert.present();
  }

  borrarDeseo(deseo: { nombre: string; comentarios: string }) { 
    this.deseos = this.deseos.filter(d => d !== deseo);
    this.guardarDeseos();
  }

  guardarDeseos() {
    sessionStorage.setItem('listaDeseos', JSON.stringify(this.deseos));
  }
}
