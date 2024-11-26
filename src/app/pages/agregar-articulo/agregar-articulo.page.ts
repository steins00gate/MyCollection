import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

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
  formularioVisible: boolean = true;  // Mantener el formulario visible

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dataService: DataService // Usamos el DataService
  ) {}

  async onSubmit() {
    this.cargando = true;

    // Crear el objeto del artículo
    const articulo = {
      nombre: this.nombre,
      categoria: this.categoria.charAt(0).toUpperCase() + this.categoria.slice(1), // Capitalizar la categoría
      comentarios: this.comentarios,
      imagen: this.imagen ? this.imagen : null, // Asumimos que los deseos no tienen imagen
    };

    // Usamos el servicio para agregar el artículo a la base de datos
    const success = await this.dataService.addArticulo(articulo.nombre, articulo.categoria, articulo.comentarios, articulo.imagen);

    setTimeout(async () => {
      this.cargando = false;

      // Mostrar alerta si el artículo se agregó con éxito
      if (success) {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Producto agregado con éxito',
          buttons: [
            {
              text: 'Cerrar',
              role: 'cancel',
              handler: () => {
                this.limpiarFormulario();
                // Aquí no cambiamos la visibilidad del formulario
              },
            },
          ],
        });

        await alert.present();
      } else {
        // Si hubo algún error, mostramos un mensaje de error
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al agregar el producto.',
          buttons: ['OK'],
        });

        await alert.present();
      }
    }, 2000); // Simulamos un tiempo de carga de 2 segundos
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
