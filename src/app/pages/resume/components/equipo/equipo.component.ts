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
// Modelos
import { Equipo } from 'src/app/core/models/equipo';
import { ESection } from 'src/app/core/models/esection.enum';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
})
export class EquipoComponent implements OnInit {
  equipos: Equipo[] = [];
  equipo: Equipo = null;
  selectedEquipo: Equipo = null;
  equipoForm: FormGroup;
  items: MenuItem[];
  displaySaveEditDialog: boolean = false;
  title: string = '';
  section = Object.keys(ESection);

  constructor(
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
          equipos.push(element);
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
        console.log(this.equipos);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardarEquipo() {
    this.equipoService.save(this.equipo).subscribe((equipo: Equipo) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: `Se ha guardo correctatamente el equipo ${equipo.nombre} con el codigo ${equipo.code}`,
      });
      this.displaySaveEditDialog = false;
      this.validarEquipo(equipo);
    });
  }
  validarEquipo(equipo: Equipo) {
    let index = this.equipos.findIndex((e) => e.code === equipo.code);
    if (index != -1) {
      this.equipos[index] = equipo;
    } else {
      this.equipos.push(equipo);
    }
    this.equipoForm.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.equipoForm.reset();
    if (editar) {
      if (this.selectedEquipo !== null && this.selectedEquipo.code !== null) {
        this.title = 'Editar';
        this.equipoForm.patchValue(this.selectedEquipo);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe seleccionar un equipo',
        });
        return;
      }
    } else {
      this.title = 'Guardar';
      this.equipo = new Equipo();
    }
    this.displaySaveEditDialog = true;
  }

  onGuardar() {
    console.log(this.equipoForm.value);
    this.equipo = this.equipoForm.value;
    this.guardarEquipo();
  }

  eliminarEquipo() {
    if (this.selectedEquipo === null || this.selectedEquipo === null) {
      this.messageService.add({
        severity: 'warn',
        summary: '!!!Advertencia¡¡¡',
        detail: 'No ha seleccionado ningun Equipo',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar este equipo?',
      accept: () => {
        this.equipoService
          .delete(this.selectedEquipo.code)
          .subscribe((equipo: Equipo) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Resultado',
              detail: `Se eliminó el equipo ${equipo.nombre} correctamente`,
            });
            this.validarEliminacion(equipo);
          },
          (error)=>{
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: `${error.error.error}`,
              detail: `No se puede eliminar el equipo si tienes registros anidados a el`,
            });
          }
          );
      },
    });
  }
  validarEliminacion(equipo: Equipo) {
    let index = this.equipos.findIndex((e) => e.code === equipo.code);
    this.equipos.splice(index, 1);
  }

  verEquipo(equipo: Equipo){
    this.router.navigateByUrl(`resumen/equipo/ver/${equipo.code}`)
  }

  ngOnInit(): void {
    this.obtenerEquipos();
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
      description: new FormControl(),
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
        command: () => this.eliminarEquipo(),
      },
      {
        label: 'Actualizar',
        icon: 'pi pi-fw pi-refresh',
        command: () => this.obtenerEquipos(),
      },
    ];
  }
}
