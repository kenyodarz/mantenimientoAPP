import { Actividad } from "./actividad";
import { Equipo } from "./equipo";

export class Instruction {
  constructor(
    public idInstruction: string = null,
    public observaciones: string = null,
    public equipo: Equipo = null,
    public actividades: Array<Actividad> = null
  ){}
}
