import { z } from 'zod';
import { roomCreateSchema, roomsGetQueryParamsSchema } from './../validations/room.validation';

export type IRoom = z.infer<typeof roomCreateSchema>;

export interface IRoomDto extends IRoom {}

export type IRoomsGetQueryParams = z.infer<typeof roomsGetQueryParamsSchema>;

export interface IRoomsGetOptions {
  pagination: {
    limit: number;
    page: number;
    offset: number;
  };
  sort: {
    by: keyof IRoom;
    order: 'asc' | 'desc';
  };
  filter: {
    title?: string;
    num?: number;
  };
}
