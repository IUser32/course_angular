import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { REMOTAS } from '../../pruebas/datos-remotos';
import { PaginaActividades } from './pagina-actividades';

describe('PaginaActividades', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [PaginaActividades],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  function crear() {
    const fixture = TestBed.createComponent(PaginaActividades);
    http.match('/api/actividades').forEach((p) => p.flush(REMOTAS));
    fixture.detectChanges();
    return fixture.componentInstance as unknown as Record<string, any>;
  }

  it('should create the component', () => {
    expect(crear()).toBeTruthy();
  });

  it('conserva la seleccion al eliminar otra actividad', () => {
    const pagina = crear();
    pagina['seleccionar'](2);
    pagina['eliminar'](3);
    expect(pagina['seleccionada']()?.id).toBe(2);
  });

  it('quita la seleccion al eliminar la actividad seleccionada', () => {
    const pagina = crear();
    pagina['seleccionar'](2);
    pagina['eliminar'](2);
    expect(pagina['seleccionada']()).toBeNull();
    expect(pagina['seleccionadaId']()).toBeNull();
  });
});
