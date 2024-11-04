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

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  canOpenMenu(): boolean {
    return !this.isLoginPage(); 
  }
}

