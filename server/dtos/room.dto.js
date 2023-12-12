export default class RoomDto {
  constructor(data) {
    this.title = data.title;
    this.price = data.price;
    this.capacity = data.capacity;
    this.numbr = data.number || data.numbr;
    this.descr = data.description || data.descr;
  }
}
