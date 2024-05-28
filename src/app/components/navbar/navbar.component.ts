import { Component } from '@angular/core';
import { ButtonDarkComponent } from '../button-dark/button-dark.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonDarkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
