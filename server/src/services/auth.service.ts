import bcrypt from 'bcrypt';
import UserDto from '../dtos/user.dto';
import UserRepository from '../repositories/user.repository';
import RefreshSessionsRepository from '../repositories/refreshSession.repository';
import TokenService from './token.service';
import { Conflict, Forbidden, NotFound, Unauthorized } from '../errors/api.error';
import { ACCESS_TOKEN_EXPIRATION } from '../consts';
import { FingerprintResult } from 'express-fingerprint';
import { IUser, IUserLogin, UserRoles, IUserPayload } from '../types/user.types';

export default class AuthService {
  static async registration(userData: IUser, fingerprint?: FingerprintResult) {
    const candidate = await UserRepository.getUserByEmail(userData.email);

    if (candidate) {
      throw new Conflict('Пользователь уже существует');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 8);
    const defaultRole: UserRoles = 'USER';
    const createdUserEntity = await UserRepository.createUser({
      ...userData,
      password: hashedPassword,
      role: defaultRole,
    });
    const createdUser = new UserDto(createdUserEntity);
    const { id, email, role } = createdUser;

    const payload: IUserPayload = { id, email, role };
    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession(id, refreshToken, fingerprint);

    return { refreshToken, accessToken, accessTokenExpiration: ACCESS_TOKEN_EXPIRATION };
  }

  static async login(userData: IUserLogin, fingerprint?: FingerprintResult) {
    const userEntity = await UserRepository.getUserByEmail(userData.email);

    if (!userEntity) {
      throw new NotFound('Пользователь не найден');
    }

    const user = new UserDto(userEntity);
    const isPasswordValid = bcrypt.compareSync(userData.password, user.password);

    if (!isPasswordValid) {
      throw new Unauthorized('Неверный логин или пароль');
    }

    const payload: IUserPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionsRepository.createRefreshSession(user.id, refreshToken, fingerprint);

    return { refreshToken, accessToken, accessTokenExpiration: ACCESS_TOKEN_EXPIRATION };
  }

  static async logout(refreshToken: string) {
    await RefreshSessionsRepository.deleteRefreshSession(refreshToken);
  }

  static async refresh(currentRefreshToken: string, fingerprint?: FingerprintResult) {
    if (!currentRefreshToken) {
      throw new Unauthorized('Не авторизован');
    }

    const refreshSession = await RefreshSessionsRepository.getRefreshSession(currentRefreshToken);

    if (!refreshSession) {
      throw new Unauthorized('Не авторизован');
    }

    if (refreshSession.fingerprint !== fingerprint?.hash) {
      throw new Forbidden('Нет доступа');
    }

    await RefreshSessionsRepository.deleteRefreshSession(currentRefreshToken);

    let payload: any;
    try {
      payload = await TokenService.verifyRefreshToken(currentRefreshToken);
    } catch (error) {
      throw new Forbidden('Нет доступа');
    }

    const userEntity = await UserRepository.getUserByEmail(payload.email);
    const { id, email, role } = new UserDto(userEntity);
    const actualPayload = { id, email, role };

    const accessToken = await TokenService.generateAccessToken(actualPayload);
    const refreshToken = await TokenService.generateRefreshToken(actualPayload);

    await RefreshSessionsRepository.createRefreshSession(id, refreshToken, fingerprint);
    return { refreshToken, accessToken, accessTokenExpiration: ACCESS_TOKEN_EXPIRATION };
  }
}
