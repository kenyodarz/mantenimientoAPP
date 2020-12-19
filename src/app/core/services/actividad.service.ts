import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Modelo
import { Actividad } from 'src/app/core/models/actividad';
// RxJS
import { Observable } from 'rxjs';
// Enviroment
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActividadService extends CommonService<Actividad, String> {
  protected API_URL: string = `${API_URL}/actividades/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
