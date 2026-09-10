import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ActividadesService } from './actividades';

const REMOTAS = [
  { id: 1, task_title: 'Revisar el informe', description: null, priority_level: 3, is_done: false, created_at: '2026-08-10T09:00:00Z' },
  { id: 2, task_title: 'Preparar la reunión', description: null, priority_level: 2, is_done: false, created_at: '2026-08-12T09:00:00Z' },
  { id: 3, task_title: 'Llamar al proveedor', description: null, priority_level: 1, is_done: true, created_at: '2026-08-14T09:00:00Z' },
];

describe('ActividadesService', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  function arrancar(cuerpo: object = REMOTAS) {
    const servicio = TestBed.inject(ActividadesService);
    http.expectOne('/api/actividades').flush(cuerpo);
    return servicio;
  }

  it('traduce los nombres del servidor al dominio', () => {
    const servicio = arrancar();

    expect(servicio.total()).toBe(3);
    expect(servicio.buscarPorId(1)?.titulo).toBe('Revisar el informe');
    expect(servicio.buscarPorId(3)?.estado).toBe('completada');
    expect(servicio.buscarPorId(1)?.prioridad).toBe('alta');
  });

  it('acepta el id como texto, que es como lo sirve json-server', () => {
    const servicio = arrancar([{ ...REMOTAS[0], id: '1' }]);

    expect(servicio.total()).toBe(1);
    expect(servicio.buscarPorId(1)?.titulo).toBe('Revisar el informe');
  });

  it('descarta lo que no encaja en vez de reventar', () => {
    const servicio = arrancar([REMOTAS[0], { id: 2, task_title: 'Sin fecha' }]);

    expect(servicio.total()).toBe(1);
    expect(servicio.error()).toBe('');
  });

  it('reintenta dos veces una lectura fallida y despues apaga el cargando', async () => {
    vi.useFakeTimers();
    const servicio = TestBed.inject(ActividadesService);

    http.expectOne('/api/actividades').error(new ProgressEvent('error'), { status: 0 });
    await vi.advanceTimersByTimeAsync(400);

    http.expectOne('/api/actividades').error(new ProgressEvent('error'), { status: 0 });
    await vi.advanceTimersByTimeAsync(700);

    http.expectOne('/api/actividades').error(new ProgressEvent('error'), { status: 0 });

    expect(servicio.cargando()).toBe(false);
    expect(servicio.error()).toContain('No se pudo conectar');
    vi.useRealTimers();
  });

  it('deshace la creacion que el servidor rechaza', () => {
    const servicio = arrancar();

    expect(servicio.crear('Actividad nueva', '', 'media')).not.toBeNull();
    expect(servicio.total()).toBe(4);

    http.expectOne('/api/actividades').error(new ProgressEvent('error'), { status: 500 });

    expect(servicio.total()).toBe(3);
    expect(servicio.error()).toContain('servidor');
  });

  it('devuelve la actividad eliminada si el servidor no acepta el borrado', () => {
    const servicio = arrancar();
    servicio.eliminar(2);

    expect(servicio.total()).toBe(2);

    http.expectOne('/api/actividades/2').error(new ProgressEvent('error'), { status: 500 });

    expect(servicio.total()).toBe(3);
  });

  afterEach(() => http.verify());
});
