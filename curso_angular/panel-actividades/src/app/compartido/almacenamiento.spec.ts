import { TestBed } from '@angular/core/testing';
import { AlmacenamientoService } from './almacenamiento';

describe('AlmacenamientoService', () => {
  let almacen: AlmacenamientoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    almacen = TestBed.inject(AlmacenamientoService);
  });

  it('should be created', () => {
    expect(almacen).toBeTruthy();
  });

  it('distingue una clave ausente de una que guarda una lista vacia', () => {
    expect(almacen.existe('panel.prueba')).toBe(false);

    almacen.guardar('panel.prueba', []);

    expect(almacen.existe('panel.prueba')).toBe(true);
    expect(almacen.leer('panel.prueba')).toEqual([]);
  });

  it('devuelve null en vez de reventar cuando lo guardado no es JSON', () => {
    localStorage.setItem('panel.roto', '{esto no es json');
    expect(almacen.leer('panel.roto')).toBeNull();
  });
});
