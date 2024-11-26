import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'; 
import { ApiService } from '../../services/api.service';  // Importar ApiService

interface Articulo {
  id: number;
  nombre: string;
  categoria: string;
  comentarios: string;
  imagen: any;
}

interface Categoria {
  nombre: string;
  imagen: string;
}

interface Deseo {
  id: number;
  nombre: string;
  categoria: string;
  comentarios: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  articulos: Articulo[] = [];
  categorias: Categoria[] = [];
  resumen: { [key: string]: number } = {};
  nombreUsuario: string = '';
  deseos: Deseo[] = [];
  indicadores: { dolar?: { valor: number }; euro?: { valor: number }; bitcoin?: { valor: number } } = {};

  constructor(
    private dataService: DataService,
    private apiService: ApiService // Inyectar ApiService
  ) {
    // Definir categorías
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
  }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('usuario') || 'Usuario';

    this.dataService.initializeDatabase().then(() => {
      this.loadArticulos();
      this.loadDeseos();
    }).catch((error) => {
      console.error('Error al inicializar la base de datos:', error);
    });

    // Obtener los indicadores económicos
    this.getEconomicIndicators();
  }

  async loadArticulos() {
    this.articulos = await this.dataService.getArticulos();
    this.updateResumen();
  }

  async loadDeseos() {
    this.deseos = await this.dataService.getDeseos();
  }

  async moveDeseoToCollection(deseo: Deseo) {
    const success = await this.dataService.moveDeseoToArticulo(deseo.id);
    if (success) {
      await this.loadArticulos();
      await this.loadDeseos();
    }
  }

  async deleteDeseo(deseo: Deseo) {
    const success = await this.dataService.deleteDeseo(deseo.id);
    if (success) {
      await this.loadDeseos();
    }
  }

  updateResumen() {
    this.resumen = {};
    this.articulos.forEach((articulo) => {
      const categoria = articulo.categoria.charAt(0).toUpperCase() + articulo.categoria.slice(1);
      this.resumen[categoria] = (this.resumen[categoria] || 0) + 1;
    });
  }

  // Método para obtener los indicadores económicos
  getEconomicIndicators() {
    this.apiService.getIndicadores().subscribe(
      (data) => {
        this.indicadores = {
          dolar: { valor: data.dolar.valor },
          euro: { valor: data.euro.valor },
          bitcoin: { valor: data.bitcoin.valor }
        };
      },
      (error) => {
        console.error('Error al cargar los indicadores económicos', error);
      }
    );
  }
}
