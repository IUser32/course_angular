import { TestBed } from '@angular/core/testing';
import { TableroPrioridades } from './tablero-prioridades';

describe('TableroPrioridades', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroPrioridades],
    }).compileComponents();
  });

  function crear() {
    const fixture = TestBed.createComponent(TableroPrioridades);
    fixture.detectChanges();
    return fixture.componentInstance as unknown as Record<string, any>;
  }

  it('should create the component', () => {
    expect(crear()).toBeTruthy();
  });

  it('conserva la seleccion al eliminar otra actividad', () => {
    const tablero = crear();
    tablero['seleccionar'](2);
    tablero['eliminar'](3);
    expect(tablero['seleccionada']()?.id).toBe(2);
  });

  it('quita la seleccion al eliminar la actividad seleccionada', () => {
    const tablero = crear();
    tablero['seleccionar'](2);
    tablero['eliminar'](2);
    expect(tablero['seleccionada']()).toBeNull();
    expect(tablero['seleccionadaId']()).toBeNull();
  });
});
