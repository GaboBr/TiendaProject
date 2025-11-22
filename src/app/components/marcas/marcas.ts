import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './marcas.html',
})

export class MarcasComponent {

  marcas: any[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private data: DataService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
    this.marcas = this.data.getMarcas();
  }
  
  registrar () {
    if (this.form.valid) {
      this.data.addMarca(this.form.value);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }  
}
