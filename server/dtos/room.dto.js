export default class RoomDto {
  constructor(data) {
    this.title = data.title;
    this.price = data.price;
    this.capacity = data.capacity;
    this.number = data.number || data.numbr;
    this.description = data.description || data.descr;
  }

  toEntity() {
    return {
      title: this.title,
      price: this.price,
      capacity: this.capacity,
      numbr: this.number,
      descr: this.description,
    };
  }
}
