import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClienteService } from '../../services/Cliente.service';
import { Cliente, ResponseData } from '../../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { PrestamosComponent } from '../../components/prestamos/prestamos.component';
import { RespData } from '../../models/Responses';
import { AlertServiceService } from '../../services/alert.service.service';

@Component({
  selector: 'app-clientedetalle',
  standalone: true,
  imports: [NavbarComponent, LoadingComponent, PrestamosComponent],
  templateUrl: './clientedetalle.component.html',
  styleUrl: './clientedetalle.component.css',
})
export class ClientedetalleComponent implements OnInit {
  loading: boolean = true;

  public cliente?: Cliente;

  constructor(
    private clienteService: ClienteService,
    private _route: ActivatedRoute,
    private _ruta: Router,
    private alertService: AlertServiceService
  ) {
    this._route = _route;
    this._ruta = _ruta;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.clienteService.getClientById(params['id']).subscribe((resp) => {
        this.cliente = resp.data;

        console.log(this.cliente);

        this.loading = false;
      });
    });
  }

  naviga() {
    this._ruta.navigate(['/clientes']);
    console.log('navegando');
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

  /*   updateClient(){
    this.clienteService.updateClient(this.cliente).subscribe(resp => {
      console.log(resp);
      this.naviga();
    });
  }
 */
}
