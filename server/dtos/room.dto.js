export default class RoomDto {
  constructor(data) {
    this.title = data.title;
    this.price = data.price;
    this.capacity = data.capacity;
    this.number = data.number || data.num;
    this.description = data.description || data.descr;
  }

  toEntity() {
    return {
      num: this.number,
      title: this.title,
      price: this.price,
      capacity: this.capacity,
      descr: this.description,
    };
  }
}
