import express from 'express';
import roomRouter from './routes/room.routes.js';

const PORT = process.env.PORT || 5050;
const pid = process.pid;

const app = express();
app.use(express.json());
app.use('/api', roomRouter);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server start on port: ${PORT}, pid: ${pid}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
