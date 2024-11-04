import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasColeccionPage } from './categorias-coleccion.page';

describe('CategoriasColeccionPage', () => {
  let component: CategoriasColeccionPage;
  let fixture: ComponentFixture<CategoriasColeccionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasColeccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
