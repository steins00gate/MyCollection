import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, MenuController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit{
  
    usuario: any='';
    password: any='';
    nombre: any='';
    email: any='';
    registroStatus: string ='';
    cargando: boolean = false;
  

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private menu: MenuController,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.menu.close("mainmenu")
  }

  async presentAlert(message: string){
    const alert = await this.alertController.create({
      header:'Mesnaje',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }


  guardar(){
    if(this.usuario.trim() === ''|| this.password.trim() === ''|| this.nombre.trim()=== '' || this.email.trim() === '') {
      this.presentAlert('Error: No pueden haber campos vacios');
    }else {
      this.registrarUsuario()
    }
  }

  async registrarUsuario() {
    try {
      this.cargando = true; // Mostrar el indicador de carga
      await this.dataService.initializeDatabase(); // Asegurarse de inicializar la base de datos
      const success = await this.dataService.registrarUser(
        this.usuario,
        this.password,
        this.nombre,
        this.email
      );
  
      if (success) {
        this.registroStatus = 'Registro Exitoso';
        this.presentAlert(this.registroStatus);
  
        // Redirigir al login después de un registro exitoso
        this.router.navigate(['/login']);
      } else {
        this.registroStatus = 'Error al registrar';
        this.presentAlert(this.registroStatus);
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      this.presentAlert('Ocurrió un error durante el registro.');
    } finally {
      this.cargando = false; // Ocultar el indicador de carga
    }
  }
}