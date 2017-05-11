export class User {
  constructor(
    public name: string,
    public lastname: string,
    public age: string,
    public location: string,
    public festivales: Array<string>,
    public isAdmin: boolean,
    public registered: any = Date.now()
  ) { }
}