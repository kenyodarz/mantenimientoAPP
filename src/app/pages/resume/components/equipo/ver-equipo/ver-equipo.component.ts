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
  equipoForm: FormGroup;
  verMotor: boolean = false;
  verReductor: boolean = false;
  verlubricante: boolean = false;

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
    this.equipoService.getOne(code).subscribe((equipo: Equipo) => {
      this.equipo = equipo;
      this.equipoForm.patchValue(equipo);
    });
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

  onGuardarEquipo() {
    console.log(this.equipoForm.value);
    this.equipo = this.equipoForm.value;
    this.equipoService.save(this.equipo).subscribe((equipo: Equipo) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: `Se ha actualizado correctatamente el equipo ${equipo.nombre} con el codigo ${equipo.code}`,
      });
      this.cargarValores(equipo.code);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code: string = params.get('id');
      this.cargarValores(code);
    });
    this.equipoForm = this.fb.group({
      code: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      section: new FormControl(null, Validators.required),
      marca: new FormControl(),
      modelo: new FormControl(),
      tipo: new FormControl(),
      numeroSerie: new FormControl(),
      dimensiones: new FormControl(),
      peso: new FormControl(),
      capacidadTrabajo: new FormControl(),
      voltaje: new FormControl(),
      amperaje: new FormControl(),
      ciclos: new FormControl(),
      kw: new FormControl(),
    });
  }
}
