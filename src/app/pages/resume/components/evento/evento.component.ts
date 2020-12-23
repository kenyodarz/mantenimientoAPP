// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Servicios
import { EventoService } from 'src/app/core/services/evento.service';
// Modelos
import { Evento } from 'src/app/core/models/evento';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  evento: Evento;
  eventos: Evento[];

  constructor(
    private eventoService: EventoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerEventos() {
    this.eventoService.getAll().subscribe((array: Evento[]) => {
      let eventos: Evento[] = [];
      array.forEach((element) => {
        eventos.push(element);
      });
      this.eventos = eventos.sort(function (a, b) {
        if (a.start > b.start) {
          return 1;
        }
        if (a.start < b.start) {
          return -1;
        }
        return 0;
      });
      console.log(this.eventos);
    });
  }

  ngOnInit(): void {
    this.obtenerEventos();
  }
}
