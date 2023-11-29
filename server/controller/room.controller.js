import db from '../config/db.js';

class RoomController {
  async createRoom(req, res) {
    const { title, description, price, capacity, number } = req.body;
    const newRoom = await db.query(
      `INSERT INTO room (title, descr, price, capacity, numbr) values ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, price, capacity, number],
    );
    res.json(newRoom.rows[0]);
  }

  async getRooms(req, res) {
    const rooms = await db.query(`SELECT * FROM room`);
    res.json(rooms.rows);
  }

  async getOneRoom(req, res) {
    const id = req.params.id;
    const room = await db.query('SELECT * FROM room WHERE id = $1', [id]);
    res.json(room.rows[0]);
  }

  async updateRoom(req, res) {
    const { id, title, price, capacity, number, description } = req.body;

    const room = await db.query(
      'UPDATE room SET title = $1, price = $2, capacity = $3, numbr = $4, descr = $5 WHERE id = $6 RETURNING *',
      [title, price, capacity, number, description, id],
    );
    res.json(room.rows[0]);
  }

  async removeRoom(req, res) {
    const id = req.params.id;
    const room = await db.query('DELETE FROM room WHERE id = $1', [id]);
    res.json({ success: true });
  }
}

export default new RoomController();
