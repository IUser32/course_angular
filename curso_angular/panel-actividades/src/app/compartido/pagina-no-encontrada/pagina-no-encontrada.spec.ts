import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PaginaNoEncontrada } from './pagina-no-encontrada';

describe('PaginaNoEncontrada', () => {
  let component: PaginaNoEncontrada;
  let fixture: ComponentFixture<PaginaNoEncontrada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNoEncontrada],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaNoEncontrada);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
