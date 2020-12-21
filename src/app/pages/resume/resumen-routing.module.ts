import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { EquipoComponent } from './components/equipo/equipo.component';
import { VerEquipoComponent } from './components/equipo/ver-equipo/ver-equipo.component';
import { HomeComponent } from './components/home/home.component';
import { InstructivoComponent } from './components/instructivo/instructivo.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ResumenComponent } from './resumen.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: ResumenComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'equipo',
        component: EquipoComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'equipo/ver/:id',
        component: VerEquipoComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'instructivo',
        component: InstructivoComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'registros',
        component: RegistroComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenRoutingModule {}
