import axios from 'axios';

export default class RoomService {
  static async getAllRooms() {
    console.log();
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/rooms`,
    );
    return response.data;
  }
}
