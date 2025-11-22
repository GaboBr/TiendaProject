import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { DataService, Cliente } from '../../services/data.service';

@Component({
  selector: "app-clientes",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./clientes.html"
})

export class ClientesComponent {
  clientes: Cliente[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private data: DataService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', Validators.required]
    });
    this.clientes = this.data.getClients();
  }

  registrar () {
    if (this.form.valid) {
      this.data.addClient(this.form.value);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

}  