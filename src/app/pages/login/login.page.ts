import { Component } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController 
  ) {}

  async onSubmit() {
    console.log('Botón Ingresar presionado');
  
    if (this.username.length >= 3 && this.username.length <= 8 && /^\d{4}$/.test(this.password)) {
      console.log('Validación exitosa. Navegando a home...');
  
      sessionStorage.setItem('nombreUsuario', this.username); 
  
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        duration: 2000, 
      });
      await loading.present();
  
      this.router.navigate(['/home'], { queryParams: { username: this.username } });
    } else {
      console.error('Falló la validación del login');
      this.showErrorAlert(); 
    }
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Error al iniciar sesión. Verifica tus credenciales.',
      buttons: ['OK'],
    });

    await alert.present();
  }
  isLoginPage() {
    return this.router.url === '/login';
  }
}
