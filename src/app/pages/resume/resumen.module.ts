import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* Modulos */
import { ResumenRoutingModule } from './resumen-routing.module';
import { PrimengModule } from 'src/app/shared/primeng.module';

/* Components */
import { HomeComponent } from './components/home/home.component';
import { ResumenComponent } from './resumen.component';
import { EquipoComponent } from './components/equipo/equipo.component';


@NgModule({
  declarations: [ResumenComponent, HomeComponent, EquipoComponent],
  imports: [
    CommonModule,
    ResumenRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [ResumenComponent],
})
export class ResumenModule {}
