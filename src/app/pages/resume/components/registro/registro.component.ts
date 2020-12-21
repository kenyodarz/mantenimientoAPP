// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
// Servicios
import { EquipoService } from 'src/app/core/services/equipo.service';
import { InstructionService } from 'src/app/core/services/instruction.service';
import { ActividadService } from 'src/app/core/services/actividad.service';
import { RegistroService } from 'src/app/core/services/registro.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
// Modelos
import { Instruction } from 'src/app/core/models/instruction';
import { Actividad } from 'src/app/core/models/actividad';
import { Equipo } from 'src/app/core/models/equipo';
import { Registro } from 'src/app/core/models/registro';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  equipos: Equipo[] = [];
  equipo: Equipo;
  registros: Registro[] = [];
  registro: Registro;
  selectedRegistro: Registro = null;
  instructivo: Instruction;
  actividades: Actividad[];
  items: MenuItem[];
  formRegistro: FormGroup;
  displaySaveEditDialog: boolean = false;
  title: string = '';
  currentUser: any;
  constructor(
    private instructionService: InstructionService,
    private actividadService: ActividadService,
    private registrosService: RegistroService,
    private equipoService: EquipoService,
    private token: TokenStorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
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
      this.actividades = i.actividades;
    });
  }

  obtenerRegistros(code: string) {
    this.registrosService
      .getByEquipo(code)
      .subscribe((registros: Registro[]) => {
        let registrosList: Registro[] = [];
        registros.forEach((registro) => {
          registrosList.push(registro);
        });
        this.registros = registrosList.sort(function (a, b) {
          if (a.fecha < b.fecha) {
            return 1;
          }
          if (a.fecha > b.fecha) {
            return -1;
          }
          return 0;
        });
      });
  }

  guardarRegistro() {
    this.registrosService.save(this.registro).subscribe((registro) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: `El registro se ha guardado correctamente con fecha ${registro.fecha}`,
      });
      this.validarRegistro(registro);
    });
  }

  validarRegistro(registro: Registro) {
    let index = this.registros.findIndex(
      (e) => e.idRegistro === registro.idRegistro
    );
    if (index != -1) {
      this.registros[index] = registro;
    } else {
      this.registros.push(registro);
    }
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.formRegistro.reset();
    if (editar) {
      if (
        this.selectedRegistro !== null &&
        this.selectedRegistro.idRegistro !== null
      ) {
        this.title = 'Editar';
        this.formRegistro.patchValue(this.selectedRegistro);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe seleccionar un registro',
        });
        return;
      }
    } else {
      this.title = 'Guardar';
      this.registro = new Registro();
      this.formRegistro.patchValue({
        vb: this.currentUser.name,
      });
    }
    this.displaySaveEditDialog = true;
  }

  onGuardar() {
    this.formRegistro.patchValue({
      vb: this.currentUser.name,
      equipo: this.equipo,
    });
    this.registro = this.formRegistro.value;
    this.guardarRegistro();
  }

  actualizarDescripcion(event) {
    this.formRegistro.patchValue({
      description: event.value.descriptionActividad,
    });
  }

  eliminarRegistro() {
    if (
      this.selectedRegistro === null ||
      this.selectedRegistro.idRegistro === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'No ha seleccionado ningun registro',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar este registro?',
      accept: () => {
        this.registrosService
          .delete(this.selectedRegistro.idRegistro)
          .subscribe((registro: Registro) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Resultado',
              detail: `Se eliminó el registro correctamente`,
            });
            this.validarEliminacion(registro);
          });
      },
    });
  }
  validarEliminacion(registro: Registro) {
    let index = this.registros.findIndex(
      (e) => e.idRegistro === registro.idRegistro
    );
    this.registros.splice(index, 1);
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.obtenerEquipos();
    this.formRegistro = this.fb.group({
      idRegistro: new FormControl(),
      fecha: new FormControl(null, Validators.required),
      actividad: new FormControl(null, Validators.required),
      description: new FormControl(),
      vb: new FormControl(),
      equipo: new FormControl(),
    });
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => this.mostrarDialogoGuardar(false),
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.mostrarDialogoGuardar(true),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => this.eliminarRegistro()
      },
      {
        label: 'Actualizar',
        icon: 'pi pi-fw pi-refresh',
        command: () => this.obtenerRegistros(this.equipo.code),
      },
    ];
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
