import axios from 'axios';

const api = `${import.meta.env.VITE_API_URL}/api`;

export default class RoomService {
  static async getAllRooms() {
    console.time('GET ALL ROOMS DURATION');
    const data = await axios
      .get(`${api}/rooms`)
      .then((response) => response.data);
    console.timeEnd('GET ALL ROOMS DURATION');
    return data;
  }

  static async createRoom(data) {
    return await axios
      .post(`${api}/rooms`, data)
      .then((response) => response.result);
  }

  static async getOneRoom(number) {
    console.time('GET ONE ROOM DURATION');
    const data = await axios
      .get(`${api}/rooms/${number}`)
      .then((response) => response.data);
    console.timeEnd('GET ONE ROOM DURATION');
    return data;
  }

  static async getAllRoomStatuses(number) {
    return await axios
      .get(`${api}/rooms/${number}/status`)
      .then((response) => response.data);
  }

  static async updateRoom(number, data) {
    return await axios
      .put(`${api}/rooms/${number}`, data)
      .then((response) => response.result);
  }

  static async removeRoom(number) {
    return await axios
      .delete(`${api}/rooms/${number}`)
      .then((response) => response.response);
  }
}
