import { Actividad } from "./actividad";
import { Equipo } from "./equipo";

export class Registro {
  constructor(
    public idRegistro: string = null,
    public fecha: Date = null,
    public actividad: Actividad = null,
    public description: string = null,
    public vb: string = null,
    public equipo: Equipo = null,
  ){}
}
