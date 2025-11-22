import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaProductos } from './venta-productos';

describe('VentaProductos', () => {
  let component: VentaProductos;
  let fixture: ComponentFixture<VentaProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
