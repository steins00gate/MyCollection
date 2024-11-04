import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaDeDeseosPage } from './lista-de-deseos.page';

describe('ListaDeDeseosPage', () => {
  let component: ListaDeDeseosPage;
  let fixture: ComponentFixture<ListaDeDeseosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeDeseosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
