import { body } from 'express-validator';
import roomRepository from '../repositories/room.repository.js';
import validation from './validation.js';

export default [
  body('title')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Поле должно содержать от 3 до 255 символов'),
  body('number')
    .toInt()
    .isInt({ min: 0, max: 2147483647 })
    .withMessage('Поле должно быть числом в пределах от 0 до 2147483647')
    .custom(async (value, { req }) => {
      if (req.method === 'POST') {
        const room = await roomRepository.getRoomByNum(value);
        if (room) throw new Error('Комната с таким номером уже существует');
      }
      return true;
    }),
  body('capacity')
    .toInt()
    .isInt({ min: 1, max: 100 })
    .withMessage('Поле должно быть числом в пределах от 1 до 100'),
  body('price')
    .toFloat()
    .isFloat({ min: 0, max: 2147483647 })
    .withMessage('Поле должно быть числом в пределах от 0 до 2147483647'),
  body('description')
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Количество символов не должно быть больше 5000'),

  validation,
];
