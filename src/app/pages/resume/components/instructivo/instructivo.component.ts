// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Servicios
import { EquipoService } from 'src/app/core/services/equipo.service';
import { InstructionService } from 'src/app/core/services/instruction.service';
import { ActividadService } from 'src/app/core/services/actividad.service';
// Modelos
import { Instruction } from 'src/app/core/models/instruction';
import { Actividad } from 'src/app/core/models/actividad';
import { Equipo } from 'src/app/core/models/equipo';

@Component({
  selector: 'app-instructivo',
  templateUrl: './instructivo.component.html',
  styleUrls: ['./instructivo.component.css'],
})
export class InstructivoComponent implements OnInit {
  equipos: Equipo[];
  equipo: Equipo = null;
  instructivos: Instruction[];
  instructivo: Instruction = null;
  selectInstructivo: Instruction;
  selectedActividad: Actividad = null;
  actividadForm: FormGroup;
  displaySaveDialog: boolean = false;

  constructor(
    private instructionService: InstructionService,
    private actividadService: ActividadService,
    private equipoService: EquipoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerEquipos(): void {
    this.equipoService.getAll().subscribe(
      (array: Equipo[]) => {
        let equipos: Equipo[] = [];
        array.forEach((element) => {
          if (!element.dadoBaja) {
            equipos.push(element);
          }
        });
        this.equipos = equipos.sort(function (a, b) {
          if (a.code > b.code) {
            return 1;
          }
          if (a.code < b.code) {
            return -1;
          }
          return 0;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerInstructivo(code: String) {
    this.instructionService.getByEquipo(code).subscribe((i) => {
      this.instructivo = i;
      console.log(this.instructivo);
    });
  }

  crearInstructivo() {
    let instructivoToSave = new Instruction();
    instructivoToSave.equipo = this.equipo;
    this.instructionService
      .save(instructivoToSave)
      .subscribe((instructivo: Instruction) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: `Se ha guardo correctatamente el instructivo con el id ${instructivo.idInstruction}`,
        });
        this.instructivo = instructivo;
      });
  }

  editarActividad(actividad: Actividad) {
    this.actividadService.save(actividad).subscribe((actividad: Actividad) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: `Se ha actualizado correctatamente la actividad: ${actividad.tipoActividad}`,
      });
    });
  }

  guardarActividad() {
    let actividadSave = this.actividadForm.value;
    this.actividadService
      .save(actividadSave)
      .subscribe((actividad: Actividad) => {
        this.instructionService
          .asignarActividades(this.instructivo, actividad)
          .subscribe((istructivo: Instruction) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Guardado',
              detail: `Se ha Creado correctatamente la actividad: ${actividad.tipoActividad}`,
            });
            this.obtenerInstructivo(istructivo.equipo.code);
            this.displaySaveDialog = false;
          });
      });
  }

  eliminarActividad() {
    if (
      this.selectedActividad === null ||
      this.selectedActividad.idActividad === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '!!!Advertencia¡¡¡',
        detail: 'No ha seleccionado ningun Equipo',
      });
      return;
    }
    let actividad = this.selectedActividad;
    this.confirmationService.confirm({
      message: `¿Está seguro que desea eliminar la actividad ${actividad.tipoActividad}?`,
      accept: () => {
        this.instructionService
          .removerActividades(this.instructivo, actividad)
          .subscribe((istructivo: Instruction) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Informacion',
              detail: `Se ha retirado correctatamente la actividad: ${actividad.tipoActividad}`,
            });
            this.obtenerInstructivo(istructivo.equipo.code);
          });
        this.selectedActividad = null;
      },
    });
  }

  ngOnInit(): void {
    this.obtenerEquipos();
    this.actividadForm = this.fb.group({
      idActividad: new FormControl(),
      tipoActividad: new FormControl(null, Validators.required),
      descriptionActividad: new FormControl(),
      frecuenciaActividad: new FormControl(),
    });
  }
}
