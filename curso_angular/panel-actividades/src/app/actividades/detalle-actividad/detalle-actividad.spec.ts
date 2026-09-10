import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DetalleActividad } from './detalle-actividad';

describe('DetalleActividad', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [DetalleActividad],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function crear(id: string) {
    const fixture = TestBed.createComponent(DetalleActividad);
    fixture.componentRef.setInput('id', id);
    fixture.detectChanges();
    return fixture.nativeElement.textContent as string;
  }

  it('should create', () => {
    expect(crear('2')).toContain('Revisar contraste');
  });

  it('distingue una actividad que no existe de una direccion que no es un numero', () => {
    expect(crear('9999')).toContain('ya no existe');
    expect(crear('abc')).toContain('no es válida');
  });
});
