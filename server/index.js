import express from 'express';
import db from './config/db.js';

const PORT = process.env.PORT || 5050;
const pid = process.pid;

const app = express();
app.use(express.json());

const testQuerySQL = async (req, res) => {
  try {
    const { id } = req.body;
    const allBookedPersonAmenity = await db
      .query(
        `SELECT DISTINCT amenity.* FROM person
        JOIN booking ON person.id = booking.person_id
        JOIN booking_room ON booking.id = booking_room.booking_id
        JOIN room ON booking_room.room_id = room.id
        JOIN room_amenity ON room.id = room_amenity.room_id
        JOIN amenity ON room_amenity.amenity_id = amenity.id
        WHERE person.id = $1;`,
        [id],
      )
      .then((data) => data.rows);

    res.json(allBookedPersonAmenity);
  } catch (err) {
    console.error(err);
    res.send(500).json({ message: 'Internal server error' });
  }
};

app.post('/amenity', testQuerySQL);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server start on port: ${PORT}, pid: ${pid}`);
    });
    db.connect(() => {
      console.log(`Database connected`);
    });
  } catch (err) {
    console.log(err); 
  }
};

start();
