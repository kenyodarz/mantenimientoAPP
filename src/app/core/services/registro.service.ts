import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Modelo
import { Registro } from 'src/app/core/models/registro';
// RxJS
import { Observable } from 'rxjs';
// Enviroment
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistroService extends CommonService<Registro, string> {
  protected API_URL: string = `${API_URL}/registros/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
  getByEquipo(code: String): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${API_URL}/registros/equipo/${code}`);
  }
}
