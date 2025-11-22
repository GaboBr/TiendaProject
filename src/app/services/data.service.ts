import { Injectable } from '@angular/core';

export interface Cliente { id: number; nombre: string; dni: string; telefono: string }
export interface Marca { id: number; nombre: string }
export interface Producto { id: number; nombre: string; precio: number; marcaId: number }
export interface Venta { id: number; clienteId: number; productoId: number; cantidad: number; total: number }

@Injectable({ providedIn: 'root' })
export class DataService {
  private clientes: Cliente[] = [];
  private marcas: Marca[] = [];
  private productos: Producto[] = [];
  private ventas: Venta[] = [];

  private clienteId = 1;
  private marcaId = 1;
  private productoId = 1;
  private ventaId = 1;

  // Clientes
  getClients() { return this.clientes; }
  addClient(data: Omit<Cliente, 'id'>) {
    const c: Cliente = { id: this.clienteId++, ...data };
    this.clientes.push(c);
    return c;
  }

  // Marcas
  getMarcas() { return this.marcas; }
  addMarca(data: Omit<Marca, 'id'>) {
    const m: Marca = { id: this.marcaId++, ...data };
    this.marcas.push(m);
    return m;
  }

  // Productos
  getProductos() { return this.productos; }
  addProducto(data: Omit<Producto, 'id'>) {
    const p: Producto = { id: this.productoId++, ...data };
    this.productos.push(p);
    return p;
  }

  // Ventas
  getVentas() { return this.ventas; }
  addVenta(data: Omit<Venta, 'id' | 'total'> & { total?: number }) {
    const producto = this.productos.find(p => p.id === data.productoId);
    const total = (data as any).total ?? ((producto?.precio ?? 0) * data.cantidad);
    const v: Venta = { id: this.ventaId++, clienteId: data.clienteId, productoId: data.productoId, cantidad: data.cantidad, total };
    this.ventas.push(v);
    return v;
  }
}
