import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, ResponseData } from '../models/cliente';
import { RespData } from '../models/Responses';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

    private _http = inject(HttpClient);
    private apiUrl: string = 'http://localhost:8080/api';

  registrarPrestamo(prestamo: any): Observable<any> {
    const url = `${this.apiUrl}/registrar`;
    return this._http.post(url, prestamo);
  }


}