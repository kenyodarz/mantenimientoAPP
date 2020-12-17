// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
// PrimeNG
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Servicios
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LubricanteService } from 'src/app/core/services/lubricante.service';
import { MotorService } from 'src/app/core/services/motor.service';
import { ReductorService } from 'src/app/core/services/reductor.service';
// Modelos
import { Equipo } from 'src/app/core/models/equipo';
import { Lubricante } from 'src/app/core/models/lubricante';
import { Motor } from 'src/app/core/models/motor';
import { Reductor } from 'src/app/core/models/reductor';
import { ESection } from 'src/app/core/models/esection.enum';

@Component({
  selector: 'app-ver-equipo',
  templateUrl: './ver-equipo.component.html',
  styleUrls: ['./ver-equipo.component.css'],
})
export class VerEquipoComponent implements OnInit {
  equipo: Equipo;
  motor: Motor;
  reductor: Reductor;
  lubricante: Lubricante;

  constructor(
    private equipoService: EquipoService,
    private motorService: MotorService,
    private lubricanteService: LubricanteService,
    private reductorService: ReductorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  obtenerEquipo(code: string) {
    this.equipoService.getOne(code).subscribe((e) => (this.equipo = e));
  }

  obtenerMotor(code: string) {
    this.motorService.getByEquipo(code).subscribe((e) => (this.motor = e));
  }

  obtenerLubricante(code: string) {
    this.lubricanteService
      .getByEquipo(code)
      .subscribe((e) => (this.lubricante = e));
  }

  obtenerReductor(code: string) {
    this.reductorService
      .getByEquipo(code)
      .subscribe((e) => (this.reductor = e));
  }

  cargarValores(code: string) {
    this.obtenerEquipo(code);
    this.obtenerLubricante(code);
    this.obtenerMotor(code);
    this.obtenerReductor(code);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code: string = params.get('id');
      this.cargarValores(code);
    });
  }
}
