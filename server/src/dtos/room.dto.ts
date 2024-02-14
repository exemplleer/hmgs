export interface IRoom {
  num: number;
  title: string;
  price: number;
  capacity: number;
  description: string;
}

export default class RoomDto implements IRoom {
  num: number;
  title: string;
  price: number;
  capacity: number;
  description: string;

  constructor(model: any) {
    this.num = model.num;
    this.title = model.title;
    this.price = model.price;
    this.capacity = model.capacity;
    this.description = model.description;
  }
}
