// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
// PrimeNG
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Servicios
import { EquipoService } from 'src/app/core/services/equipo.service';
// Modelos
import { Equipo } from 'src/app/core/models/equipo';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
})
export class EquipoComponent implements OnInit {
  equipos: Equipo[];
  equipo: Equipo;
  selectedEquipo: Equipo;
  equipoForm: FormGroup;
  items: MenuItem[];
  displaySaveEditDialog: boolean = false;

  constructor(
    private equipoService: EquipoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
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

  ngOnInit(): void {
    this.obtenerEquipos();
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        // command: () => this.showSaveDialog(false),
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        // command: () => this.showSaveDialog(true),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        // command: () => this.eliminar(),
      },
      {
        label: 'Actualizar',
        icon: 'pi pi-fw pi-refresh',
        // command: () => this.obtenerProyectos(),
      },
    ];
  }
}
