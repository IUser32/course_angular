import { TestBed } from '@angular/core/testing';
import { PanelSeccion } from './panel-seccion';

describe('PanelSeccion', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelSeccion],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PanelSeccion);
    fixture.componentRef.setInput('titulo', 'Resumen');
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
