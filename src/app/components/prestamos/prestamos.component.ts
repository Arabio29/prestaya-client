import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertServiceService } from '../../services/alert.service.service';
import { PrestamoService } from '../../services/prestamos.service';
import { Prestamos, Cliente } from '../../models/Responses';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
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
  fechaSeleccionada: Date = new Date();
  dataPrestamos: any;

  @Input() prestamos?: Prestamos[];
  @Input() cliente?: Cliente;

  @ViewChild('detallePrestamoModal', { static: false }) detallePrestamoModal!: ElementRef;

  constructor(private form: FormBuilder, private alertService: AlertServiceService, private renderer: Renderer2, private prestamoService : PrestamoService) {
    this.prestamoForm = this.form.group({
      credito: ['', Validators.required],
      numCuotas: ['', Validators.required],
      interes: ['', Validators.required],
      fecha: ['', Validators.required],
      modalidad: ['', Validators.required]
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

    console.log(this.cliente);
  }

  calculoCuota(): void {
    this.credito = this.prestamoForm.value.credito;
    this.numCuotas = this.prestamoForm.value.numCuotas;
    this.interes = this.prestamoForm.value.interes;

    let i = this.interes / 100;
    this.interesGanado = this.credito * i;
    this.totalPagar = this.credito + this.interesGanado;
    this.cuotaPago = this.totalPagar / this.numCuotas;

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
      case 1: return 7; // Semanal
      case 2: return 14; // Quincenal
      case 3: return 30; // Mensual
      case 4: return 365; // Anual
      case 5: return 1; // Diario
      default: return 0;
    }
  }

  savePrestamo() {
    this.calculoCuota(); // Asegúrate de calcular cuota antes de guardar

    if (this.prestamoForm.valid) {
      const dataPrestamos = {
        monto: this.prestamoForm.value.credito,
        modalidad: this.prestamoForm.value.modalidad,
        cuotas: this.prestamoForm.value.numCuotas,
        tasaInteres: this.prestamoForm.value.interes,
        fechaInicio: this.prestamoForm.value.fecha,
        cuotaPagar: this.cuotaPago,
        totalPagar: this.totalPagar,
        interesGenerado: this.interesGanado,
        fechaActual: this.fechaActual,
        fechasCuotas: this.fechasCuotas,
        clienteId: this.cliente?.id
      };

      console.log(dataPrestamos);
      this.prestamoService.registrarPrestamo(dataPrestamos).subscribe(
        response => {
          if (response && response.status === 'OK') {
            this.alertService.success('Prestamo registrado exitosamente');
          } else {
            this.alertService.error('Error al registrar el prestamo');
          }
        },
        error => {
          this.alertService.error('Error al registrar el prestamo');
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }


  printModalContent() {
    const printContents = this.detallePrestamoModal.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    const popupWin = window.open('', '_blank', 'width=600,height=600');
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Imprimir contenido del modal</title>
          <style>
            /* Aquí puedes agregar estilos adicionales para la impresión */
            body { font-family: Arial, sans-serif; }
            .table { width: 100%; margin-bottom: 1rem; color: #212529; }
            .table th, .table td { padding: 0.75rem; vertical-align: top; border-top: 1px solid #dee2e6; }
            .table thead th { vertical-align: bottom; border-bottom: 2px solid #dee2e6; }
            .table tbody + tbody { border-top: 2px solid #dee2e6; }
            .table .table { background-color: #fff; }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWin?.document.close();
  }


  //add

}
