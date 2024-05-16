import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private router: Router, private authService: AuthService) {
    this.username = '';
    this.password = ''; 
  }

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/inicio']);
    } else {
      alert('Credenciales inválidas');
    }
  }
}
