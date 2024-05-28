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
}









