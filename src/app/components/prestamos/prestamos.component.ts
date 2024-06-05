import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AlertServiceService } from '../../services/alert.service.service';
import { RespData, Prestamos } from '../../models/Responses';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
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
  fechasCuotas: Date[] = [];
  fechaSeleccionada: Date;

onChangeFecha(): void {
  this.calcularFechasCuotas();
}


  @Input() prestamos?: Prestamos[];
  @ViewChild('detallePrestamoModal') detallePrestamoModal!: ElementRef;

  constructor(private form: FormBuilder, private alertService: AlertServiceService, private renderer: Renderer2) {
    this.fechaActual = new Date();
    this.fechaSeleccionada = new Date();
    this.prestamoForm = this.form.group({
      credito: ['', Validators.required],
      numCuotas: ['', Validators.required],
      interes: ['', Validators.required],
      fecha: ['']
    });

  }

  ngOnInit(): void {
    const fechaControl = this.prestamoForm.get('fecha');
    if (fechaControl) {
      fechaControl.valueChanges.subscribe((fechaSeleccionada: string) => {
        this.fechaSeleccionada = new Date(fechaSeleccionada);
        console.log('Fecha seleccionada:', this.fechaSeleccionada);
      });
    }
  }
 
  calculoCuota(): void {
    this.credito = this.prestamoForm.value.credito;
    this.numCuotas = this.prestamoForm.value.numCuotas;
    this.interes = this.prestamoForm.value.interes;
    this.fechaActual = new Date();

    let i = this.interes / 100;
    this.interesGanado = this.credito * i;
    this.totalPagar = this.credito + this.interesGanado;
    this.cuotaPago = this.totalPagar / this.numCuotas;

        // Calcular fechas de cuotas
        this.calcularFechasCuotas();
  }

  calcularFechasCuotas(): void {
    const modalidadSeleccionada = this.prestamoForm.value.modalidad;
    const incremento = this.obtenerIncrementoModalidad(modalidadSeleccionada);
    this.fechasCuotas = [];
    let fecha = new Date(this.fechaSeleccionada); // Utilizar fechaSeleccionada en lugar de fechaActual
    for (let i = 0; i < this.numCuotas; i++) {
      let nuevaFecha = new Date(fecha); // Crear una nueva instancia de Date en cada iteración
      nuevaFecha.setDate(nuevaFecha.getDate() + incremento * i); // Añadir incremento de días
      this.fechasCuotas.push(nuevaFecha); // Agregar fecha al array de fechas de cuotas
    }
    console.log(this.fechasCuotas);
  }
  

  obtenerIncrementoModalidad(modalidad: number): number {
    switch (modalidad) {
      case 1: // Semanal
        return 7;
      case 2: // Quincenal
        return 14;
      case 3: // Mensual
        return 30;
      case 4: // Anual
        return 365;
      case 5: // Diario
        return 1;
      default:
        return 0;
    }
  }

  onChangeModalidad(event: any): void {
    const modalidadSeleccionada = event.target.value;
    if (modalidadSeleccionada !== null && modalidadSeleccionada !== undefined) {
      // Tu lógica aquí
    }
    console.log(modalidadSeleccionada);
    console.log(this.fechaSeleccionada);
  }

  imprimirContenidoModal() {
    const modalContent = this.detallePrestamoModal.nativeElement.outerHTML;
  
    const ventanaImpresion = window.open('', '', 'height=720,width=1280');
    const bootstrapCSS = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
  
    ventanaImpresion?.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Imprimir Modal</title>
          <link rel="stylesheet" href="${bootstrapCSS}">
        </head>
        <body>
          ${modalContent}
        </body>
      </html>
    `);
    ventanaImpresion?.document.close();
    ventanaImpresion?.print();
  }
//add
}









