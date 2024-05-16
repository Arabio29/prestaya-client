import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';

import { ClientesComponent } from './pages/clientes/clientes.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { ClientedetalleComponent } from './pages/clientedetalle/clientedetalle.component';

import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
    { path: 'clientes', component: ClientesComponent },
    { path: 'clientes/:id', component: ClientedetalleComponent },
    { path: 'prestamos', component: PrestamosComponent},
    { path: 'pagos', component: PagosComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
