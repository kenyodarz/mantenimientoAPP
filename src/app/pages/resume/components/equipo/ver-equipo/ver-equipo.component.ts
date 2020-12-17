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
// Modelos
import { Equipo } from 'src/app/core/models/equipo';
import { ESection } from 'src/app/core/models/esection.enum';

@Component({
  selector: 'app-ver-equipo',
  templateUrl: './ver-equipo.component.html',
  styleUrls: ['./ver-equipo.component.css'],
})
export class VerEquipoComponent implements OnInit {
  equipo: Equipo;

  constructor(
    private equipoService: EquipoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  obtenerEquipo(code: string) {
    this.equipoService.getOne(code).subscribe((e) => {(this.equipo = e)
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code: string = params.get('id');
      this.obtenerEquipo(code);
    });
  }
}
