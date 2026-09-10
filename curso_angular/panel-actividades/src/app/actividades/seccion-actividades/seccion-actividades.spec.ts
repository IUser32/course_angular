import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SeccionActividades } from './seccion-actividades';

describe('SeccionActividades', () => {
  let component: SeccionActividades;
  let fixture: ComponentFixture<SeccionActividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionActividades],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SeccionActividades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
