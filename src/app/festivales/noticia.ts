export class Noticia {
  constructor(
    public titulo: string,
    public entradilla: string,
    public contenido : string,
    public photo: string,
    public published: any = Date.now()
  ) { }
}