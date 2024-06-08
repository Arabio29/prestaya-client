import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AlertServiceService } from '../../services/alert.service.service';
import { PrestamoService } from '../../services/prestamos.service';
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

  constructor(private form: FormBuilder, private alertService: AlertServiceService, private renderer: Renderer2, private prestamoService : PrestamoService) {
    this.fechaActual = new Date();
    this.fechaSeleccionada = new Date();
    this.prestamoForm = this.form.group({
      credito: ['', Validators.required],
      numCuotas: ['', Validators.required],
      interes: ['', Validators.required],
      fecha: [''],
      modalidad: ['']
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
  this.fechasCuotas = [];
  const modalidadSeleccionada = this.prestamoForm.value.modalidad;
  const incrementoDias = this.obtenerIncrementoModalidad(modalidadSeleccionada);
  const fechaInicialString = this.prestamoForm.value.fecha;
  const fechaInicial = new Date(fechaInicialString);

  for (let i = 0; i < this.prestamoForm.value.numCuotas; i++) {
    let nuevaFecha = new Date(fechaInicial);
    nuevaFecha.setDate(nuevaFecha.getDate() + (incrementoDias * (i + 1)));
    this.fechasCuotas.push(nuevaFecha);
  }

  console.log('modalidadSeleccionada:', modalidadSeleccionada);
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


  savePrestamo(){
    if (this.prestamoForm.valid) {
      const prestamo = this.prestamoForm.value;
      this.prestamoService.registrarPrestamo(prestamo).subscribe(
        response => {
          this.alertService.success('Prestamo registrado exitosamente');
        },
        error => {
          this.alertService.error('Error al registrar el prestamo');
        }
      );
    } else {
      console.error('Formulario inválido');
    } 


  }


//add
}









