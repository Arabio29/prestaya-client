import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingComponent } from '../../components/loading/loading.component';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ NavbarComponent, LoadingComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {





}