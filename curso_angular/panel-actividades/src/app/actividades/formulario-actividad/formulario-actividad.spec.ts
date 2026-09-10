import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActividadesService } from '../actividades';
import { FormularioActividad } from './formulario-actividad';

describe('FormularioActividad', () => {
  beforeEach(async () => {
    localStorage.clear();
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [FormularioActividad],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function crear(id?: string) {
    const fixture = TestBed.createComponent(FormularioActividad);
    if (id !== undefined) {
      fixture.componentRef.setInput('id', id);
    }
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
    expect(editar.nativeElement.querySelector('#titulo').value).toBe('Revisar contraste');
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

    instancia['modelo'].set({ titulo: 'Revisar contraste', descripcion: 'Sin perder esto', prioridad: 'alta' });
    fixture.detectChanges();
    instancia['enviar']();
    fixture.detectChanges();

    expect(instancia['errorEnvio']()).toContain('Ya existe');
    expect(instancia['modelo']().descripcion).toBe('Sin perder esto');
  });

  it('deja guardar una edicion sin cambiar el titulo', () => {
    const servicio = TestBed.inject(ActividadesService);
    expect(servicio.actualizar(2, 'Revisar contraste', 'otra descripcion', 'alta')).toBe(true);
  });
});
