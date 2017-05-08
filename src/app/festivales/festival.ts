export class Festival {
  constructor(
    public name: string,
    public style: string,
    public description : string,
    public location: string,
    public address: string,
    public startDate: string,
    public month: string,
    public endDate: string,
    public mainPhoto: string,
    public photos: Array<string>,
    public assistants: Array<string>,
    public active: boolean,
    public published: any = Date.now()
  ) { }
}