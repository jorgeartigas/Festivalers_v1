export class User {
  constructor(
    public name: string,
    public lastname: string,
    public age: string,
    public location: string,
    public estilos: Array<string>,
    public profilePhoto: string,
    public photos: Array<string>,
    public videos: Array<string>,
    public festivales: Array<string>,
    public amigos: Array<string>,
    public artistas: Array<string>,
    public notificaciones: Array<string>,
    public isAdmin: boolean,
    public registered: any = Date.now()
  ) { }
}