import { Component } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, NgModel} from '@angular/forms';

@Component({
  selector: 'app-button-dark',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './button-dark.component.html',
  styleUrl: './button-dark.component.css'
})
export class ButtonDarkComponent {
  darkMode: boolean = false;

  constructor(private form: FormBuilder) {

  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
