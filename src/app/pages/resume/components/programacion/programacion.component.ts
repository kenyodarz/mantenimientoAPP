// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
// Servicios
import { EventoService } from 'src/app/core/services/evento.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { InstructionService } from 'src/app/core/services/instruction.service';
import { ActividadService } from 'src/app/core/services/actividad.service';
// Modelos
import { Evento } from 'src/app/core/models/evento';
import { Instruction } from 'src/app/core/models/instruction';
import { Actividad } from 'src/app/core/models/actividad';
import { Equipo } from 'src/app/core/models/equipo';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css'],
})
export class ProgramacionComponent implements OnInit {
  equipos: Equipo[];
  equipo: Equipo = null;
  instructivos: Instruction[];
  instructivo: Instruction = null;
  selectInstructivo: Instruction;
  selectedActividad: Actividad = null;
  displaySaveEditModal: boolean = false;
  fechaEvent: Date = null;

  constructor(
    private eventoService: EventoService,
    private instructionService: InstructionService,
    private actividadService: ActividadService,
    private equipoService: EquipoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private config: PrimeNGConfig
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
    });
  }

  selectActividad(actividad: Actividad) {
    this.selectedActividad = actividad;
    this.fechaEvent = null;
    this.displaySaveEditModal = true;
  }

  generarEventos() {
    // console.log(this.fechaEvent);
    this.confirmationService.confirm({
      message: `Se procedera a generar los eventos a la actividad iniciando desde ${this.fechaEvent}, presione SI para continuar`,
      accept: () => {
        this.eventoService.generarEventos(
          this.selectedActividad,
          this.fechaEvent,
          this.instructivo.equipo.code
        ).subscribe((eventos: Evento[])=>{
          this.messageService.add({
            severity: 'success',
            summary:"Generados",
            detail: `se han generado ${eventos.length} eventos`
          })
        });
      },
    });
  }

  ngOnInit(): void {
    this.obtenerEquipos();
    this.config.setTranslation({
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      today: 'Hoy',
      clear: 'Borrar',
    });
  }
}
