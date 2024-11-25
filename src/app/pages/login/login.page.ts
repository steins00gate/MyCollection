import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';
import { Data, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  password: string = '';
  navCtrl: any;

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
    private dataService: DataService
  ) {}

  ngOnInit() {
  }

  // Método para mostrar alerta de error
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
  async  login() {
    await this.dataService.initializeDatabase();
    // Verificar que el campo de usuario no esté vacío
    if (!this.usuario) {
     this.mostrarAlerta('El campo de usuario no puede estar vacío.');
     return;
   }

   // Verificar que la contraseña no esté vacía
   if (!this.password) {
     this.mostrarAlerta('El campo de contraseña no puede estar vacío.');
     return;
   }
 
   // Verificar que la contraseña tenga máximo 4 caracteres
   if (this.password.length > 4) {
     this.mostrarAlerta('La contraseña no puede tener más de 4 caracteres.');
     return;
   }

   const isAuthenticated = await this.dataService.loginUser(this.usuario, this.password);

   if (isAuthenticated) {
      // Mostrar mensaje "Iniciando sesión..."
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
        duration: 4000, // Ajusta la duración según prefieras
      });
      await loading.present();
    // Si la autenticación es correcta, navega a la página "home"

     // Guardar el nombre del usuario en Local Storage
     localStorage.setItem('usuario', this.usuario );

     loading.onDidDismiss().then(() => {
      this.router.navigate(['/home']);
    });  
  } else {
    // Muestra alerta si las credenciales son incorrectas
    this.mostrarAlerta('Usuario o contraseña incorrectos.');
  }
}


registro()
{
  this.router.navigate(['/registro']);
}


} 