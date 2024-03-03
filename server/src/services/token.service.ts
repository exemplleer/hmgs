import jwt from 'jsonwebtoken';
import { Forbidden, Unauthorized } from '../errors/api.error';
import { AuthRequest } from '../types/express.types';
import { NextFunction } from 'express';

export default class TokenService {
  static async verifyAccessToken(accessToken: string) {
    return await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
  }

  static async verifyRefreshToken(refreshToken: string) {
    return await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  }

  static async generateAccessToken(payload: object) {
    return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '30m',
    });
  }

  static async generateRefreshToken(payload: object) {
    return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '15d',
    });
  }

  static async checkAccess(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')?.[1];

    if (!token) {
      return next(new Unauthorized('Не авторизован'));
    }

    try {
      req.user = await TokenService.verifyAccessToken(token);
    } catch (error) {
      return next(new Forbidden('Нет доступа'));
    }
    next();
  }
}
