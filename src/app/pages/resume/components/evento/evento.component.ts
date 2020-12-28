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
// FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  evento: Evento;
  eventos: Evento[];
  options: any;

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
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: esLocale,
      defaultView: 'listYear',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      editable: true,
      height: "auto",
    };
  }
}
