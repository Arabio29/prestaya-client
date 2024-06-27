import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

 /*  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        success => this.router.navigate(['/']),
        error => console.error(error)
      );
    }
  } */

    onSubmit() {
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe(
          response => {
            console.log('Login successful, token:', response.token);
            this.router.navigate(['/inicio']);
          },
          error => {
            console.error('Login error:', error);
          }
        );
      }
    }
}
