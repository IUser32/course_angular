import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { REMOTAS } from '../../pruebas/datos-remotos';
import { FormularioActividad } from './formulario-actividad';

describe('FormularioActividad', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [FormularioActividad],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  function crear(id?: string) {
    const fixture = TestBed.createComponent(FormularioActividad);
    if (id !== undefined) {
      fixture.componentRef.setInput('id', id);
    }
    http.match('/api/actividades').forEach((p) => p.flush(REMOTAS));
    fixture.detectChanges();
    return fixture;
  }

  it('should create the component', () => {
    expect(crear().componentInstance).toBeTruthy();
  });

  it('abre vacio al crear y relleno al editar', () => {
    expect(crear().nativeElement.textContent).toContain('Nueva actividad');

    const editar = crear('2');
    expect(editar.nativeElement.textContent).toContain('Editar actividad');
    expect(editar.nativeElement.querySelector('#titulo').value).toBe('Preparar la reunión');
  });

  it('no habilita descartar hasta que algo cambia', () => {
    const fixture = crear('2');
    const descartar = () =>
      fixture.nativeElement.querySelectorAll('button')[1] as HTMLButtonElement;

    expect(descartar().disabled).toBe(true);

    const instancia = fixture.componentInstance as unknown as Record<string, any>;
    instancia['modelo'].update((m: Record<string, unknown>) => ({ ...m, titulo: 'Otro titulo' }));
    fixture.detectChanges();

    expect(descartar().disabled).toBe(false);
    expect(fixture.componentInstance.tieneCambios()).toBe(true);
  });

  it('avisa del titulo repetido sin borrar lo escrito', () => {
    const fixture = crear();
    const instancia = fixture.componentInstance as unknown as Record<string, any>;

    instancia['modelo'].set({ titulo: 'Revisar el informe', descripcion: 'Sin perder esto', prioridad: 'alta' });
    fixture.detectChanges();
    instancia['enviar']();
    fixture.detectChanges();

    expect(instancia['errorEnvio']()).toContain('Ya existe');
    expect(instancia['modelo']().descripcion).toBe('Sin perder esto');
  });
});
