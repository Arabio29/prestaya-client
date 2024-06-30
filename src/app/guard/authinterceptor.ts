// **JwtInterceptor**: Interceptor para añadir el token JWT a las cabeceras de las solicitudes HTTP.
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtiene el token JWT del almacenamiento local
    const token = localStorage.getItem('token');
    if (token) {
      // Si el token existe, lo añade a las cabeceras de la solicitud
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    // Continúa con la solicitud
    return next.handle(request);
  }
}