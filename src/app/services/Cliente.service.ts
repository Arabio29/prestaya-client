import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, ResponseData } from '../models/cliente';
import { RespData } from '../models/Responses';

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

  saveClient(cliente: Cliente){
    const url =  `${this.apiUrl}/cliente`;
    return this._http.post<Cliente>(url, cliente);
  }

  deleteClient(id: number){
    const url = `${this.apiUrl}/cliente/${id}`;
    return this._http.delete(url);
  }

  getClientById(id: number){
    const url = `${this.apiUrl}/cliente/${id}`;
    return this._http.get<RespData<any>>(url);
  }

  updateClient(cliente: Cliente){
    const url = `${this.apiUrl}/cliente/${cliente.id}`;
    return this._http.put(url, cliente);
  }

}