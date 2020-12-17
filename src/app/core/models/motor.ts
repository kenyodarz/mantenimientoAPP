import { Equipo } from "./equipo";

export class Motor {
  constructor(
    public idMotor: string = null,
    public marca: string = null,
    public modelo: string = null,
    public tipo: string = null,
    public clase: string = null,
    public fase: string = null,
    public noSerie: string = null,
    public aislamiento: string = null,
    public connection: string = null,
    public fs: string = null,
    public hp: string = null,
    public rpm: string = null,
    public voltaje: string = null,
    public amperaje: string = null,
    public frecuencia: string = null,
    public cos: string = null,
    public kw: string = null,
    public equipo: Equipo = null
  ) {}
}
