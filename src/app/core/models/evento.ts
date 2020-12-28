import { Actividad } from "./actividad";

export class Evento {
  constructor(
    public idEvento: string = null,
    public title: string = null,
    public start: Date = null,
    public url: string = null,
    public actividad: Actividad = null,
    public cumplido: boolean = null
  ) {}
}
