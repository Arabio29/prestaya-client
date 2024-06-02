import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClienteService } from '../../services/Cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { Cliente, ResponseData } from '../../models/cliente';
import {ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertServiceService } from '../../services/alert.service.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, ReactiveFormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  errorMessage: string = '';
  client: any = {};
  ubicacion: any = {}; 

  clienteForm: FormGroup

  constructor(private form: FormBuilder, private clienteService: ClienteService, private _router: Router, private alertService: AlertServiceService) {
    this._router = _router;
    this.clienteForm = this.form.group({
      nombre: ['', Validators.required],
      documento: ['', Validators.required],
      celular: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.getAllClient();
  }

  navegate(id:number){
    console.log(id)
    this._router.navigate(['/clientes', id])
  }

  getAllClient(): void {
    this.clienteService.getAllClients().subscribe(
      (response: ResponseData | Cliente[]) => {
        if (Array.isArray(response)) {
          this.clientes = response as Cliente[];
        } else {
          if (response.status === 'OK' && response.data) {
            this.clientes = response.data;
          } else {
            this.errorMessage = response.error || 'Error en la respuesta del servidor';
          }
        }
      },
      error => {
        console.error('Error al obtener los clientes:', error);
        this.errorMessage = 'Error en la comunicación con el servidor'
      }
    );
  }

  enviar(){
    if (this.clienteForm.valid) {
      const cliente = this.clienteForm.value;
      console.log(cliente)
       this.clienteService.saveClient(cliente).subscribe(
        response => {
          this.alertService.success('Cliente registrado exitosamente');
          this.getAllClient();
        },
        error => {
          this.alertService.error('Error al registrar el cliente');
        }
      );
    } else {
      console.error('Formulario inválido');
    } 
  }



  registrarCliente() {
    const opciones: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 20000, // 20 segundos
      maximumAge: 0 // No utilizar la caché
    };
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.ubicacion = {
          latitud: position.coords.latitude,
          longitud: position.coords.longitude
        };
        this.client.ubicacion = this.ubicacion;
        console.log(this.ubicacion);
  
        
/*         this.clienteService.registrarCliente(this.cliente).subscribe(
          (response) => {
            console.log("Cliente registrado exitosamente");
          },
          (error) => {
            console.log("Error al registrar el cliente:", error);
          }
        );
         */
      },
      (error) => {
        console.log("Error al obtener la ubicación:", error);
      }
    );
  }
  

  //add
}
