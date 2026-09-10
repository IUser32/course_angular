import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { Actividad } from '../../modelos/actividad';
import { ListaActividades } from './lista-actividades';

const ACTIVIDADES: Actividad[] = [
  { id: 1, titulo: 'Revisar contraste', estado: 'en_progreso', prioridad: 'media', creadaEn: '2026-08-12', destacada: false },
];

describe('ListaActividades', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaActividades],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ListaActividades);
    fixture.componentRef.setInput('actividades', ACTIVIDADES);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('reenvia hacia arriba la eliminacion que emite la tarjeta', () => {
    const fixture = TestBed.createComponent(ListaActividades);
    fixture.componentRef.setInput('actividades', ACTIVIDADES);
    fixture.detectChanges();

    let emitido: number | undefined;
    fixture.componentInstance.eliminacionSolicitada.subscribe((id) => (emitido = id));

    const boton = fixture.nativeElement.querySelector('[aria-label="Eliminar Revisar contraste"]') as HTMLButtonElement;
    boton.click();

    expect(emitido).toBe(1);
  });
});
