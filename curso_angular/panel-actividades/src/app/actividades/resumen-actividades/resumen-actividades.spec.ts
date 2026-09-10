import { TestBed } from '@angular/core/testing';
import { ResumenActividades } from './resumen-actividades';

describe('ResumenActividades', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenActividades],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ResumenActividades);
    fixture.componentRef.setInput('total', 5);
    fixture.componentRef.setInput('pendientes', 3);
    fixture.componentRef.setInput('enProgreso', 1);
    fixture.componentRef.setInput('completadas', 1);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
