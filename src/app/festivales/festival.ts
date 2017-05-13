export class Festival {
  constructor(
    public owner: string,
    public name: string,
    public style: string,
    public description : string,
    public location: string,
    public address: string,
    public month: string,
    public startDate: string,
    public endDate: string,
    public mainPhoto: string,
    public photos: Array<string>,
    public active: boolean,
    public urlAmigable: string,
    public published: any = Date.now()
  ) { }
}