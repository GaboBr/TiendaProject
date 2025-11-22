import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService, Producto, Marca } from '../../services/data.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './productos.html'
})
export class ProductosComponent {
  productos: Producto[] = [];
  marcas: Marca[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private data: DataService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      marcaId: [null, Validators.required]
    });
    this.productos = this.data.getProductos();
    this.marcas = this.data.getMarcas();
  }

  registrar() {
    if (this.form.valid) {
      const value = this.form.value;
      this.data.addProducto({ nombre: value.nombre, precio: +value.precio, marcaId: +value.marcaId });
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  getMarcaNombre(id: number) {
    const m = this.marcas.find(x => x.id === id);
    return m ? m.nombre : '';
  }
}
