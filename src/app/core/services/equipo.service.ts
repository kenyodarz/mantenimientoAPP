import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Modelo
import { Equipo } from 'src/app/core/models/equipo';
// RxJS
import { Observable } from 'rxjs';
// Enviroment
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipoService extends CommonService<Equipo, string> {
  protected API_URL: string = `${API_URL}/equipos/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
}
