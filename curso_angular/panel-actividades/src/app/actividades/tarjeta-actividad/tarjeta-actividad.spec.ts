import { TestBed } from '@angular/core/testing';
import type { Actividad } from '../../modelos/actividad';
import { TarjetaActividad } from './tarjeta-actividad';

const ACTIVIDAD: Actividad = {
  id: 1,
  titulo: 'Revisar contraste',
  estado: 'en_progreso',
  prioridad: 'media',
  creadaEn: '2026-08-12',
  destacada: false,
  descripcion: '',
};

describe('TarjetaActividad', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaActividad],
    }).compileComponents();
  });

  function crear() {
    const fixture = TestBed.createComponent(TarjetaActividad);
    fixture.componentRef.setInput('actividad', ACTIVIDAD);
    fixture.detectChanges();
    return fixture;
  }

  it('should create the component', () => {
    expect(crear().componentInstance).toBeTruthy();
  });

  it('emite el id al pedir que la eliminen, sin tocar la actividad', () => {
    const fixture = crear();
    let emitido: number | undefined;
    fixture.componentInstance.eliminacionSolicitada.subscribe((id) => (emitido = id));

    const boton = fixture.nativeElement.querySelector('[aria-label="Eliminar Revisar contraste"]') as HTMLButtonElement;
    boton.click();

    expect(emitido).toBe(1);
    expect(ACTIVIDAD.estado).toBe('en_progreso');
  });
});
