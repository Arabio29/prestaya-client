import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

    private _http = inject(HttpClient);
    private apiUrl: string = 'http://localhost:8080/api';

  registrarCliente(cliente: any): Observable<any> {
    const url = `${this.apiUrl}/registrar`;
    return this._http.post(url, cliente);
  }

  getAllClients(): Observable<Cliente[]>{
    const url = `${this.apiUrl}/cliente`;
    return this._http.get<Cliente[]>(url);
  }
}