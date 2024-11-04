import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarArticuloPage } from './agregar-articulo.page';

describe('AgregarArticuloPage', () => {
  let component: AgregarArticuloPage;
  let fixture: ComponentFixture<AgregarArticuloPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
