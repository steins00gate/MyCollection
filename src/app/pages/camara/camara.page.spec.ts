import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamaraPage } from './camara.page';
import { MenuController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

describe('CamaraPage', () => {
  let component: CamaraPage;
  let fixture: ComponentFixture<CamaraPage>;
  let menuControllerSpy: jasmine.SpyObj<MenuController>;

  beforeEach(async () => {
    menuControllerSpy = jasmine.createSpyObj('MenuController', ['close']);

    await TestBed.configureTestingModule({
      declarations: [CamaraPage],
      providers: [
        { provide: MenuController, useValue: menuControllerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamaraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cerrar el menú al inicializar', () => {
    expect(menuControllerSpy.close).toHaveBeenCalledOnceWith('mainMenu');
  });
});
