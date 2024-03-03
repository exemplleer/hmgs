import { z } from 'zod';
import { roomCreateSchema } from './../validations/room.validation';

type IRoom = z.infer<typeof roomCreateSchema>;

export interface IRoomDto extends IRoom {}
