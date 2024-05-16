import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;

  constructor() { }

  login(username: string, password: string): boolean {
    // Lógica para verificar las credenciales (aquí es solo un ejemplo)
    if (username === 'admin' && password === '2978') {
      this.isAuthenticated = true;
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  // Método público para verificar si el usuario está autenticado
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
