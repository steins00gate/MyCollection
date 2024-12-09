import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPage } from './login.page';
import { DataService } from 'src/app/services/data.service';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(waitForAsync(() => {
    // Crear mocks para Router y DataService
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDataService = jasmine.createSpyObj('DataService', ['initializeDatabase', 'loginUser']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: DataService, useValue: mockDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar un error si el usuario está vacío', async () => {
    spyOn(component, 'mostrarAlerta'); // Espiar el método mostrarAlerta
    component.usuario = '';
    component.password = '1234';
    await component.login();
    expect(component.mostrarAlerta).toHaveBeenCalledWith('El campo de usuario no puede estar vacío.');
  });

  it('debería mostrar un error si la contraseña excede 4 caracteres', async () => {
    spyOn(component, 'mostrarAlerta');
    component.usuario = 'test';
    component.password = '12345'; // Contraseña inválida
    await component.login();
    expect(component.mostrarAlerta).toHaveBeenCalledWith('La contraseña no puede tener más de 4 caracteres.');
  });

  it('debería navegar a /home si el login es exitoso', async () => {
    const loadingMock = {
      present: jasmine.createSpy('present'),
      dismiss: jasmine.createSpy('dismiss'),
      onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve()),
    };
  
    // Simular que la autenticación es exitosa
    mockDataService.loginUser.and.returnValue(Promise.resolve(true));
  
    // Simula la creación del loadingController
    spyOn(component['loadingController'], 'create').and.returnValue(Promise.resolve(loadingMock as any));
  
    // Establecer valores para el usuario y contraseña
    component.usuario = 'test';
    component.password = '1234';
  
    await component.login();
  
    // Esperar a que el loading se haya "despedido" y la navegación ocurra
    await loadingMock.onDidDismiss();
  
    // Verificar que la función navigate haya sido llamada con la ruta correcta
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
  
  

  it('debería mostrar un error si el login falla', async () => {
    spyOn(component, 'mostrarAlerta');
    // Simular autenticación fallida
    mockDataService.loginUser.and.returnValue(Promise.resolve(false)); 
    component.usuario = 'test@example.com';
    component.password = '1234';
    
    await component.login();
    
    // Verificar que se haya llamado a mostrarAlerta con el mensaje de error
    expect(component.mostrarAlerta).toHaveBeenCalledWith('Usuario o contraseña incorrectos.');
  });

});
