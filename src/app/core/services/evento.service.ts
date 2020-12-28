import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Modelo
import { Evento } from 'src/app/core/models/evento';
import { Actividad } from 'src/app/core/models/actividad';
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
  
  generarEventos(actividad: Actividad, fecha: Date, title: string): Observable<Evento[]>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Evento[]>(
      `${API_URL}/eventos/generar/${fecha}/${title}`,
      actividad,
      { headers: headers }
    );
  }
}
