import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AlertController } from '@ionic/angular';

interface Deseo {
  id?: number;
  nombre: string;
  categoria: string;
  comentarios: string;
}

@Component({
  selector: 'app-lista-de-deseos',
  templateUrl: './lista-de-deseos.page.html',
  styleUrls: ['./lista-de-deseos.page.scss'],
})
export class ListaDeDeseosPage implements OnInit {
  deseos: Deseo[] = [];
  nuevoDeseo: Deseo = {
    nombre: '',
    categoria: '',
    comentarios: '',
  };
  categorias: string[] = [
    'Cartas coleccionables',
    'Figuras',
    'Libros',
    'Monedas',
    'Cómics',
    'Videojuegos',
    'Consolas',
    'Autos de juguete',
  ];
  cargando: boolean = false;  // Control para la animación del toolbar

  constructor(
    private dataService: DataService,
    private alertController: AlertController // Agregar AlertController
  ) {}

  ngOnInit() {
    this.dataService
      .initializeDatabase()
      .then(() => {
        this.loadDeseos();
      })
      .catch((error) => {
        console.error('Error al inicializar la base de datos:', error);
      });
  }

  async loadDeseos() {
    this.deseos = await this.dataService.getDeseos();
  }

  async addDeseo() {
    if (this.nuevoDeseo.nombre && this.nuevoDeseo.categoria && this.nuevoDeseo.comentarios) {
      this.cargando = true; // Iniciar animación

      const { nombre, categoria, comentarios } = this.nuevoDeseo;
      const success = await this.dataService.addDeseo(nombre, categoria, comentarios); // Añadir deseo

      setTimeout(async () => {
        this.cargando = false; // Terminar animación

        // Mostrar alerta si el deseo se agregó con éxito
        if (success) {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Deseo agregado con éxito',
            buttons: ['OK'],
          });
          await alert.present();
          this.nuevoDeseo = { nombre: '', categoria: '', comentarios: '' }; // Limpiar formulario
          this.loadDeseos(); // Recargar deseos
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un problema al agregar el deseo.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      }, 2000); // Simular tiempo de carga
    } else {
      console.warn('Todos los campos son obligatorios.');
    }
  }

  async moveDeseoToCollection(deseo: Deseo) {
    if (deseo.id) {
      const success = await this.dataService.moveDeseoToArticulo(deseo.id);
      if (success) {
        this.loadDeseos();
      }
    } else {
      console.error('El deseo no tiene un ID válido.');
    }
  }

  async deleteDeseo(deseo: Deseo) {
    if (deseo.id) {
      const success = await this.dataService.deleteDeseo(deseo.id);
      if (success) {
        this.loadDeseos();
      }
    } else {
      console.error('El deseo no tiene un ID válido.');
    }
  }
}
