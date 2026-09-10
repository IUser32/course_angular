import { TestBed } from '@angular/core/testing';
import { ActividadesService } from './actividades';

const CLAVE = 'panel.actividades.v1';

describe('ActividadesService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(TestBed.inject(ActividadesService)).toBeTruthy();
  });

  it('guarda cada cambio sin que la operacion se acuerde de hacerlo', () => {
    const servicio = TestBed.inject(ActividadesService);
    servicio.eliminar(1);

    expect(servicio.total()).toBe(4);
    expect(JSON.parse(localStorage.getItem(CLAVE) ?? '[]')).toHaveLength(4);
  });

  it('conserva una lista vacia al recargar, en vez de volver a los ejemplos', () => {
    TestBed.inject(ActividadesService).vaciar();

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    expect(TestBed.inject(ActividadesService).total()).toBe(0);
  });

  it('avisa y se queda con los ejemplos cuando lo guardado no pasa el guardian', () => {
    localStorage.setItem(CLAVE, '[{"id":1}]');

    const servicio = TestBed.inject(ActividadesService);

    expect(servicio.total()).toBe(5);
    expect(servicio.aviso()).not.toBe('');
  });
});
