// Angular
import { Component, OnInit } from '@angular/core';
// Servicios
import { EventoService } from 'src/app/core/services/evento.service';
// Modelos
import { Evento } from 'src/app/core/models/evento';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
// FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  evento: Evento;
  eventos: Evento[];
  options: any;

  constructor(
    private eventoService: EventoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  obtenerEventos() {
    this.eventoService.getAll().subscribe((array: Evento[]) => {
      let eventos: Evento[] = [];
      array.forEach((element) => {
        if (!element.cumplido) {
          eventos.push(element);
        }
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

  terminarEvento(id: String) {
    let evento: Evento;
    this.eventoService.getOne(id).subscribe((e) => {
      evento = e;
      this.confirmationService.confirm({
        message: `¿Desea dar por terminada la actividad de ${evento.actividad.tipoActividad} Programada para el ${evento.start}?`,
        accept: () => {
          evento.cumplido = true;
          this.eventoService.save(evento).subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Actualizado',
              detail:
                'la actividad ha sido dada por terminada de manera satisfactoria',
            });
            this.obtenerEventos();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'La actividad aun sigue programada',
          });
        },
      });
    });
  }

  ngOnInit(): void {
    this.obtenerEventos();
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: esLocale,
      defaultView: 'listMonth',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'listDay,listMonth,listYear',
      },
      editable: true,
      height: 'auto',
      eventClick: (e) => {
        this.terminarEvento(e.event._def.extendedProps.idEvento);
      },
    };
  }
}
