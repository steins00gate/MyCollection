import { Component } from '@angular/core';

@Component({
  selector: 'app-categorias-coleccion',
  templateUrl: './categorias-coleccion.page.html',
  styleUrls: ['./categorias-coleccion.page.scss'],
})
export class CategoriasColeccionPage {
  categorias = [
    {
      nombre: 'Cartas coleccionables',
      imagen: 'assets/images/cartas.jpg',
      descripcion: 'Cartas de juegos y coleccionables.',
    },
    {
      nombre: 'Figuras',
      imagen: 'assets/images/figuras.jpg',
      descripcion: 'Figuras de acción y coleccionables.',
    },
    {
      nombre: 'Libros',
      imagen: 'assets/images/libros.jpg',
      descripcion: 'Libros antiguos y ediciones especiales.',
    },
    {
      nombre: 'Monedas',
      imagen: 'assets/images/monedas.jpg',
      descripcion: 'Monedas de diferentes épocas y lugares.',
    },
    {
      nombre: 'Comics',
      imagen: 'assets/images/comics.jpg',
      descripcion: 'Historietas y cómics coleccionables.',
    },
    {
      nombre: 'Videojuegos',
      imagen: 'assets/images/videojuegos.jpg',
      descripcion: 'Juegos digitales y físicos.',
    },
    {
      nombre: 'Consolas',
      imagen: 'assets/images/consolas.jpg',
      descripcion: 'Consolas de videojuegos de todas las generaciones.',
    },
    {
      nombre: 'Autos de juguete',
      imagen: 'assets/images/autos.jpg',
      descripcion: 'Colecciones de autos en miniatura.',
    }
  ];

  constructor() { }
}

