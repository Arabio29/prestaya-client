import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AlertServiceService } from '../../services/alert.service.service';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent implements OnInit {

  prestamoForm: FormGroup;

  credito: number = 0;
  numCuotas: number = 0;
  interes: number = 0; 
  totalPagar: number = 0;
  interesGanado: number = 0;
  cuotaPago: number = 0;
  fechaActual = new Date();


  constructor(private form: FormBuilder, private alertService: AlertServiceService) {

    this.fechaActual = new Date();

    this.prestamoForm = this.form.group({
      credito: ['', Validators.required],
      numCuotas: ['', Validators.required],
      interes: ['', Validators.required],
    });
    console.log(this.prestamoForm);
  }



  ngOnInit(): void { }

  calculoCuota(): void {

    this.credito = this.prestamoForm.value.credito;
    this.numCuotas = this.prestamoForm.value.numCuotas;
    this.interes = this.prestamoForm.value.interes;
    this.fechaActual = new Date();

    let i = this.interes / 100;

    this.interesGanado = this.credito * i;

    this.totalPagar = this.credito + this.interesGanado;

    this.cuotaPago = this.totalPagar / this.numCuotas;

    console.log(this.cuotaPago);
    console.log(this.prestamoForm.value);
  }

  prestamos = [
    {
      id: 1, 
      monto: 10000.0,
      modalidad: 'Mensual',
      cuotas: 12,
      tasaInteres: 0.05,
      cuotaPagar: 950.0,
      totalPagar: 11400.0,
      fechaInicio: new Date('2024-05-30T00:00:00Z'),
      interesGenerado: 1400.0,
      clienteId: 1,
      estado: 'Activo'
    },
    { 
      id: 2,
      monto: 15000.0,
      modalidad: 'Trimestral',
      cuotas: 6,
      tasaInteres: 0.06,
      cuotaPagar: 2700.0,
      totalPagar: 16200.0,
      fechaInicio: new Date('2024-06-15T00:00:00Z'),
      interesGenerado: 1200.0,
      clienteId: 2,
      estado: 'Activo'
    }
    // Puedes agregar más objetos según sea necesario
  ];
}









