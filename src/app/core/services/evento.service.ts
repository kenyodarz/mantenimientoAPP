import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Modelo
import { Evento } from 'src/app/core/models/evento';
// RxJS
import { Observable } from 'rxjs';
// Enviroment
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventoService extends CommonService<Evento, String> {
  protected API_URL: string = `${API_URL}/eventos/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
