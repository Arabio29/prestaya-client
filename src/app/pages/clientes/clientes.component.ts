import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClienteService } from '../../services/ClienteService';
import { HttpClientModule } from '@angular/common/http';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent implements OnInit {

  constructor(private clienteService: ClienteService) {}

  clientes: Cliente[] = [];
  client: any = {};
  ubicacion: any = {};

  ngOnInit(): void {
    this.getAllClient();
  }

  getAllClient(): void {
    this.clienteService.getAllClients().subscribe(
      response => {
        this.clientes = response; // Asignar directamente la respuesta a la propiedad clientes
        console.log(this.clientes);
      },
      error => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  }

  /* getAllClient(){
    this.clienteService.getAllClients().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
        console.log(this.clientes);
      },
      (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  } */

 /*  clientes: Cliente[] = [
    { nombre: "eliasib", cedula: "1004806951", celular: "3219591377" },
    { nombre: "juanes", cedula: "14543633346", celular: "321457377" },
    { nombre: "sebastian", cedula: "345634777", celular: "34574577377" },
    { nombre: "johan", cedula: "9647545777", celular: "3299943377" }
  ]; */

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
        console.log(this.ubicacion)
       /* this.clienteService.registrarCliente(this.cliente).subscribe(
          (response) => {
            console.log("Cliente registrado exitosamente");
          },
          (error) => {
            console.log("Error al registrar el cliente:", error);
          }
        );*/
      },
      (error) => {
        console.log("Error al obtener la ubicación:", error);
      }
    );
    opciones
  }
}
