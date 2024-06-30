// **AuthService**: Servicio para manejar autenticación, almacenamiento del token y verificación de estado de sesión.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  // Otros campos si los hay
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL de la API para autenticación

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string, password: string }): Observable<AuthResponse> {
    console.log('credentials:', credentials); // Log para verificar credenciales
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Almacena el token JWT en el almacenamiento local al iniciar sesión
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    // Elimina el token al cerrar sesión y redirige al usuario a la página de login
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Verifica si el token está presente para determinar si el usuario está autenticado
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }
}
