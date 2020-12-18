import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Modelo
import { Lubricante } from 'src/app/core/models/lubricante';
// RxJS
import { Observable } from 'rxjs';
// Enviroment
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LubricanteService extends CommonService<Lubricante, string> {
  protected API_URL: string = `${API_URL}/lubricantes/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
  getByEquipo(code: String): Observable<Lubricante[]> {
    return this.http.get<Lubricante[]>(`${API_URL}/lubricantes/equipo/${code}`);
  }
}
