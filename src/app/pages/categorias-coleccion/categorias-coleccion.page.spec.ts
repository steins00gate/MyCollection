import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CategoriasColeccionPage } from './categorias-coleccion.page';
import { By } from '@angular/platform-browser';

describe('CategoriasColeccionPage', () => {
  let component: CategoriasColeccionPage;
  let fixture: ComponentFixture<CategoriasColeccionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasColeccionPage ],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriasColeccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar las categorías correctamente', () => {
    // Detectar los elementos que contienen las categorías
    const categoriaCards = fixture.debugElement.queryAll(By.css('ion-card'));
  
    // Verificar que hay tantas cards como categorías
    expect(categoriaCards.length).toBe(component.categorias.length, 'La cantidad de tarjetas no coincide con la cantidad de categorías');
  
    // Comprobar que cada card tiene los valores correctos
    categoriaCards.forEach((card, index) => {
      const img = card.query(By.css('img')).nativeElement;
      const title = card.query(By.css('ion-card-title')).nativeElement;
      const content = card.query(By.css('ion-card-content')).nativeElement;
  
      // Verificar que la imagen tiene la ruta correcta
      expect(img.src).toContain(component.categorias[index].imagen, 'La imagen no coincide con la categoría esperada');
  
      // Verificar que el título y el contenido corresponden con los datos de la categoría
      expect(title.textContent.trim()).toBe(component.categorias[index].nombre, 'El nombre de la categoría no coincide');
      expect(content.textContent.trim()).toBe(component.categorias[index].descripcion, 'La descripción de la categoría no coincide');
    });
  });
});
