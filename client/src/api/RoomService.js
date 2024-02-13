import axios from 'axios';

const api = `${import.meta.env.VITE_API_URL}/api`;

class RoomService {
  async getAllRooms() {
    return await axios.get(`${api}/rooms`).then((response) => response.data);
  }

  async createRoom(data) {
    return await axios
      .post(`${api}/rooms`, data)
      .then((response) => response.result);
  }

  async getOneRoom(number) {
    return await axios
      .get(`${api}/rooms/${number}`)
      .then((response) => response.data);
  }

  async getAllRoomStatuses(number) {
    return await axios
      .get(`${api}/rooms/${number}/status`)
      .then((response) => response.data);
  }
  z;
  async updateRoom(number, data) {
    return await axios
      .put(`${api}/rooms/${number}`, data)
      .then((response) => response.result);
  }

  async removeRoom(number) {
    return await axios
      .delete(`${api}/rooms/${number}`)
      .then((response) => response.response);
  }
}

export default new RoomService();
