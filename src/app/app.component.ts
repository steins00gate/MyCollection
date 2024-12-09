import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {  // Implementar OnInit para llamar a initializeDatabase()

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private dataService: DataService
  ) {}

  // Método que se ejecuta cuando el componente se inicializa
  async ngOnInit() {
    // Inicializa la base de datos y agrega el usuario de prueba
    await this.dataService.initializeDatabase();

    // Exponer el servicio dataService al objeto window para acceso global después de la inicialización
    if ((<any>window).Cypress) {
      (<any>window).dataService = this.dataService;
    }
  }

  closeMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.close();
    }
  }

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión...',
      duration: 4000,
    });
    await loading.present();

    loading.onDidDismiss().then(() => {
      this.router.navigate(['/login']);
    });
  }

  isRestrictedPage(): boolean {
    const restrictedRoutes = ['/login', '/registro']; // Agregar rutas donde el menú debe estar deshabilitado
    return restrictedRoutes.includes(this.router.url);
  }

  canOpenMenu(): boolean {
    return !this.isRestrictedPage();
  }
}
