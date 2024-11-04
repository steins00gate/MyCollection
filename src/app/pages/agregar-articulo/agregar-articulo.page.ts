import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.page.html',
  styleUrls: ['./agregar-articulo.page.scss'],
})
export class AgregarArticuloPage {
  categoria: string = '';
  nombre: string = '';
  comentarios: string = '';
  imagen: File | null = null;
  cargando: boolean = false;
  agregadoConExito: boolean = false;

  constructor(private router: Router, private alertController: AlertController) {} 

  async onSubmit() {
    this.cargando = true;

    const articulo = {
      categoria: this.categoria.charAt(0).toUpperCase() + this.categoria.slice(1),
      nombre: this.nombre,
      comentarios: this.comentarios,
      imagen: this.imagen,
    };

    const articulos = JSON.parse(sessionStorage.getItem('articulos') || '[]');
    articulos.push(articulo);
    sessionStorage.setItem('articulos', JSON.stringify(articulos));

    setTimeout(async () => {
      this.cargando = false;

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Producto agregado con éxito',
        buttons: [
          {
            text: 'Cerrar',
            role: 'cancel',
            handler: () => {
              this.limpiarFormulario();
            },
          },
        ],
      });

      await alert.present();
    }, 2000); 
}
  
  limpiarFormulario() {
    this.categoria = '';
    this.nombre = '';
    this.comentarios = '';
    this.imagen = null;
  }
  

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagen = input.files[0];
    } else {
      this.imagen = null;
    }
  }

  irAInicio() {
    this.router.navigate(['/home']);
  }
}
