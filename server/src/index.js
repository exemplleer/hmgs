import express from 'express';
import roomRouter from './routes/room.routes.js';
import cors from 'cors';
import morgan from 'morgan';

const PORT = process.env.PORT || 5050;
const pid = process.pid;

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
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
