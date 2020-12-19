import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from 'src/app/core/services/common.service';
// Modelo
import { Instruction } from 'src/app/core/models/instruction';
// RxJS
import { Observable } from 'rxjs';
// Enviroment
import { API_URL } from 'src/environments/environment';
import { Actividad } from '../models/actividad';

@Injectable({
  providedIn: 'root',
})
export class InstructionService extends CommonService<Instruction, String> {
  protected API_URL: string = `${API_URL}/instrucciones/`;
  constructor(protected http: HttpClient) {
    super(http);
  }

  getByEquipo(code: String): Observable<Instruction[]> {
    return this.http.get<Instruction[]>(
      `${API_URL}/instrucciones/equipo/${code}`
    );
  }

  asignarActividades(
    instructivo: Instruction,
    actividad: Actividad
  ): Observable<Instruction> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<Instruction>(
      `${API_URL}/${instructivo.idInstruction}/asignar-actividades`,
      actividad,
      { headers: headers }
    );
  }

  removerActividades(
    instructivo: Instruction,
    actividad: Actividad
  ): Observable<Instruction> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<Instruction>(
      `${API_URL}/${instructivo.idInstruction}/eliminar-actividades`,
      actividad,
      { headers: headers }
    );
  }
}
