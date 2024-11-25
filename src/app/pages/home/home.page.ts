import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service'; // Asegúrate de que esta ruta sea correcta

interface Articulo {
  categoria: string;
  nombre: string;
  comentarios: string;
  imagen: File | null;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  articulos: Articulo[] = [];
  categorias: any[] = [];
  resumen: { [key: string]: number } = {};
  nombreUsuario: string = '';
  deseos: { nombre: string; comentarios: string; categoria: string }[] = [];
  indicadores: { dolar?: { valor: number }; euro?: { valor: number }; bitcoin?: { valor: number } } = {};

  constructor(private apiService: ApiService) {
    this.categorias = [
      { nombre: 'Cartas coleccionables', imagen: 'assets/images/cartas.jpg' },
      { nombre: 'Figuras', imagen: 'assets/images/figuras.jpg' },
      { nombre: 'Libros', imagen: 'assets/images/libros.jpg' },
      { nombre: 'Monedas', imagen: 'assets/images/monedas.jpg' },
      { nombre: 'Comics', imagen: 'assets/images/comics.jpg' },
      { nombre: 'Videojuegos', imagen: 'assets/images/videojuegos.jpg' },
      { nombre: 'Consolas', imagen: 'assets/images/consolas.jpg' },
      { nombre: 'Autos de juguete', imagen: 'assets/images/autos.jpg' },
    ];

    this.nombreUsuario = sessionStorage.getItem('nombreUsuario') || 'Usuario';
    this.deseos = JSON.parse(sessionStorage.getItem('listaDeseos') || '[]');
  }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('usuario') || 'Usuario';
    this.cargarArticulos();
    this.cargarIndicadores(); // Cargar indicadores económicos
  }

  cargarArticulos() {
    const articulos = JSON.parse(sessionStorage.getItem('articulos') || '[]');
    this.articulos = articulos;

    this.resumen = {};

    this.articulos.forEach((articulo) => {
      if (this.resumen[articulo.categoria]) {
        this.resumen[articulo.categoria]++;
      } else {
        this.resumen[articulo.categoria] = 1;
      }
    });
  }

  cargarIndicadores() {
    this.apiService.getIndicadores().subscribe(
      (data) => {
        this.indicadores.dolar = data.dolar;
        this.indicadores.euro = data.euro;
        this.indicadores.bitcoin = data.bitcoin;
      },
      (error) => {
        console.error('Error al cargar los indicadores económicos:', error);
      }
    );
  }
  

  borrarDeseo(deseo: { nombre: string; comentarios: string; categoria: string }) {
    this.deseos = this.deseos.filter((d) => d !== deseo);
    this.guardarDeseos();
  }

  agregarDeseoAColeccion(deseo: { nombre: string; comentarios: string; categoria: string }) {
    const nuevoArticulo: Articulo = {
      nombre: deseo.nombre,
      comentarios: deseo.comentarios,
      categoria: deseo.categoria,
      imagen: null,
    };

    this.articulos.push(nuevoArticulo);
    sessionStorage.setItem('articulos', JSON.stringify(this.articulos));

    this.actualizarResumen(nuevoArticulo.categoria);

    this.borrarDeseo(deseo);

    this.cargarArticulos();
  }

  actualizarResumen(categoria: string) {
    categoria = categoria.charAt(0).toUpperCase() + categoria.slice(1);

    if (this.resumen[categoria]) {
      this.resumen[categoria]++;
    } else {
      this.resumen[categoria] = 1;
    }
  }

  guardarDeseos() {
    sessionStorage.setItem('listaDeseos', JSON.stringify(this.deseos));
  }
}
