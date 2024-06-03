import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClienteService } from '../../services/Cliente.service';
import { Cliente, ResponseData } from '../../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { PrestamosComponent } from '../../components/prestamos/prestamos.component';
import { RespData, Prestamos } from '../../models/Responses';
import { AlertServiceService } from '../../services/alert.service.service';
import {ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientedetalle',
  standalone: true,
  imports: [NavbarComponent, LoadingComponent, PrestamosComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './clientedetalle.component.html',
  styleUrl: './clientedetalle.component.css',
})
export class ClientedetalleComponent implements OnInit {
  loading: boolean = true;
  public prestamo?: Prestamos[];
  public cliente?: Cliente;
  clienteForm: FormGroup;
  RespData: any;

  constructor(
    private clienteService: ClienteService,
    private _route: ActivatedRoute,
    private _ruta: Router,
    private alertService: AlertServiceService,
    private form: FormBuilder
  ) {
    this._route = _route;
    this._ruta = _ruta;
    this.clienteForm = this.form.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.minLength(7)]],
      celular: ['', [Validators.required, Validators.minLength(7)]],
      direccion: ['', [Validators.required, Validators.minLength(4)]],
      id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.clienteService.getClientById(params['id']).subscribe((resp) => {
        this.cliente = resp.data;
        this.prestamo = this.cliente?.prestamos;  

        this.clienteForm.setValue({
          id: this.cliente?.id,
          nombre: this.cliente?.nombre,
          cedula: this.cliente?.cedula,
          celular: this.cliente?.celular,
          direccion: this.cliente?.direccion   
        });  

        this.loading = false;
      });
    });
  }

  naviga() {
    this._ruta.navigate(['/clientes']);
  }

  hasErrors(controlName: string, errorType: string) {
    return this.clienteForm.get(controlName)?.hasError(errorType) && this.clienteForm.get(controlName)?.touched;
  }

  confirmDelete(): void {
    this.alertService.warningDelete().then((result) => {
      if (result.isConfirmed) {
        this.deleteClient();
      }
    });
  }

  deleteClient(): void {
    if (this.cliente) {
      this.clienteService.deleteClient(this.cliente.id).subscribe((resp) => {
        console.log(resp);
        if (resp == null) {
          this.alertService.success('Cliente eliminado');
          this.naviga();
        }
      });
    } else {
      this.alertService.error('No se pudo eliminar el cliente');
    }
  }

  updateClient(): void {
    if (this.clienteForm.valid) {
      const client = this.clienteForm.value;
      this.clienteService.updateClient(client).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == 'OK') {
          this.alertService.success('Cliente actualizado');
        }
      });
    } else {
      this.alertService.error('Por favor, complete correctamente el formulario');
    }
  }
  
  
}
