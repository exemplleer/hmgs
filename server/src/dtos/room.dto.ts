import { IRoomDto } from '../types/room.types';

export default class RoomDto implements IRoomDto {
  num;
  title;
  price;
  capacity;
  description;

  constructor(model: any) {
    this.num = model.num;
    this.title = model.title;
    this.price = model.price;
    this.capacity = model.capacity;
    this.description = model.description;
  }
}
