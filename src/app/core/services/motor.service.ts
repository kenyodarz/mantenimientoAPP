import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Modelo
import { Motor } from 'src/app/core/models/motor';
// RxJS
import { Observable } from 'rxjs';
// Enviroment
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MotorService extends CommonService<Motor, string> {
  protected API_URL: string = `${API_URL}/motores/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
  getByEquipo(code: String): Observable<Motor> {
    return this.http.get<Motor>(`${API_URL}/motores/equipo/${code}`);
  }
}
