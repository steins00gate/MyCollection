import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private loadingController: LoadingController) {}

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

