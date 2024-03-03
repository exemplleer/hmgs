import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fingerprint from 'express-fingerprint';
import router from './routes';

const PORT = process.env.PORT || 5050;
const pid = process.pid;

const app = express();
app.use(morgan('dev'));
app.use(fingerprint());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/api', router);

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
