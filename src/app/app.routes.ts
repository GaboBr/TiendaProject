import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio';
import { ClientesComponent } from './components/clientes/clientes';
import { MarcasComponent } from './components/marcas/marcas';
import { ProductosComponent } from './components/productos/productos';
import { VentaProductosComponent } from './components/venta-productos/venta-productos';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'marcas', component: MarcasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'venta', component: VentaProductosComponent },
  { path: '**', redirectTo: '' }
];
