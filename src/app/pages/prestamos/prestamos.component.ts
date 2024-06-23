import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {
  @Input() prestamos?: Prestamos[];
  @Input() cliente?: Cliente;
}
