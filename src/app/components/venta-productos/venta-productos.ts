import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService, Cliente, Producto, Venta } from '../../services/data.service';

@Component({
  selector: 'app-venta-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './venta-productos.html'
})
export class VentaProductosComponent {
  form: FormGroup;
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  ventas: Venta[] = [];
  precioSeleccionado = 0;

  constructor(private fb: FormBuilder, private data: DataService) {
    this.form = this.fb.group({
      clienteId: [null, Validators.required],
      productoId: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
    this.clientes = this.data.getClients();
    this.productos = this.data.getProductos();
    this.ventas = this.data.getVentas();
  }

  onProductoChange() {
    const pid = +this.form.get('productoId')?.value;
    const p = this.productos.find((x: any) => x.id === pid);
    this.precioSeleccionado = p ? p.precio : 0;
  }

  registrarVenta() {
    if (this.form.valid) {
      const v = this.data.addVenta({ clienteId: +this.form.value.clienteId, productoId: +this.form.value.productoId, cantidad: +this.form.value.cantidad });
      this.ventas = this.data.getVentas();
      this.form.patchValue({ cantidad: 1, productoId: null, clienteId: null });
      this.precioSeleccionado = 0;
    } else {
      this.form.markAllAsTouched();
    }
  }

  getClienteNombre(id: number) {
    const c = this.clientes.find((x: any) => x.id === id);
    return c ? c.nombre : '';
  }

  getProductoNombre(id: number) {
    const p = this.productos.find((x: any) => x.id === id);
    return p ? p.nombre : '';
  }
}
