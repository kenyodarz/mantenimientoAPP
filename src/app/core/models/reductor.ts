import { Equipo } from "./equipo";

export class Reductor {
  constructor(
    public idReductor: string = null,
    public marca: string = null,
    public modelo: string = null,
    public tipo: string = null,
    public noSerie: string = null,
    public rpm: string = null,
    public hp: string = null,
    public relation: string = null,
    public rpmSalida: string = null,
    public otros: string = null,
    public equipo: Equipo = null
  ) {}
}
