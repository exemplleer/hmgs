export default class RoomDto {
  constructor(model) {
    this.num = model.num;
    this.title = model.title;
    this.price = model.price;
    this.capacity = model.capacity;
    this.description = model.description;
  }
}
