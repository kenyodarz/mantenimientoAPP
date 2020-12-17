import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Modelo
import { Reductor } from 'src/app/core/models/reductor';
// RxJS
import { Observable } from 'rxjs';
// Enviroment
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReductorService extends CommonService<Reductor, string> {
  protected API_URL: string = `${API_URL}/reductores/`;
  constructor(protected http: HttpClient) {
    super(http);
  }
  getByEquipo(code: String): Observable<Reductor>{
    return this.http.get<Reductor>(`${API_URL}/reductores/equipo/${code}`);
  }
}
