import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { REMOTAS } from '../../pruebas/datos-remotos';
import { DetalleActividad } from './detalle-actividad';

describe('DetalleActividad', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [DetalleActividad],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  function crear(id: string) {
    const fixture = TestBed.createComponent(DetalleActividad);
    fixture.componentRef.setInput('id', id);
    http.match('/api/actividades').forEach((p) => p.flush(REMOTAS));
    fixture.detectChanges();
    return fixture.nativeElement.textContent as string;
  }

  it('should create', () => {
    expect(crear('2')).toContain('Preparar la reunión');
  });

  it('distingue una actividad que no existe de una direccion que no es un numero', () => {
    expect(crear('9999')).toContain('ya no existe');
    expect(crear('abc')).toContain('no es válida');
  });
});
