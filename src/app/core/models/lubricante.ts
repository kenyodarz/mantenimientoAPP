import { Equipo } from './equipo';

export class Lubricante {
  constructor(
    public idLubricante: string = null,
    public parte: string = null,
    public method: string = null,
    public lubricante: string = null,
    public frecuencia: string = null,
    public notas: string = null,
    public equipo: Equipo = null
  ) {}
}
