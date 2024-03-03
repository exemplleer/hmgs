import ErrorUtils from '../errors/api.error';
import AuthService from '../services/auth.service';
import { userLoginSchema, userRegistrationSchema } from '../validations/user.validation';
import { COOKIE_SETTINGS } from '../consts';
import { Request, Response } from 'express';
import { IUser, IUserLogin } from '../types/user.types';

export default class AuthController {
  static async registration(req: Request, res: Response) {
    try {
      const userData: IUser = userRegistrationSchema.parse(req.body);
      const fingerprint = req.fingerprint;
      const tokenData = await AuthService.registration(userData, fingerprint);
      const { refreshToken, accessToken, accessTokenExpiration } = tokenData;
      res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (error) {
      return ErrorUtils.catchError(res, error);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const userData: IUserLogin = userLoginSchema.parse(req.body);
      const fingerprint = req.fingerprint;
      const tokenData = await AuthService.login(userData, fingerprint);
      const { accessToken, refreshToken, accessTokenExpiration } = tokenData;
      res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
      res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (error) {
      return ErrorUtils.catchError(res, error);
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      await AuthService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.sendStatus(200);
    } catch (error) {
      return ErrorUtils.catchError(res, error);
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const currentRefreshToken = req.cookies.refreshToken;
      const fingerprint = req.fingerprint;
      const tokenData = await AuthService.refresh(currentRefreshToken, fingerprint);
      const { accessToken, refreshToken, accessTokenExpiration } = tokenData;
      res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
      res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (error) {
      return ErrorUtils.catchError(res, error);
    }
  }
}
