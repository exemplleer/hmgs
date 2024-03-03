import { Request } from 'express';
import { IUserPayload } from './user.types';
import { JwtPayload } from 'jsonwebtoken';

export type AuthRequest = Request & {
  headers: { authorization: string };
  user: JwtPayload | string;
};

export type RequestWithUser = Request & IUserPayload;
