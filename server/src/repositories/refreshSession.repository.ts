import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { FingerprintResult } from 'express-fingerprint';

const refreshSessionModel = prisma.refreshSession;

export default class RefreshSessionRepository {
  static async getRefreshSession(refreshToken: string) {
    return await refreshSessionModel.findFirst({
      where: {
        refreshToken,
      },
    });
  }

  static async createRefreshSession(
    userId: number,
    refreshToken: string,
    fingerprint?: FingerprintResult,
  ) {
    return await refreshSessionModel.create({
      data: {
        personId: userId,
        refreshToken,
        fingerprint: fingerprint?.hash,
      },
    });
  }

  static async deleteRefreshSession(refreshToken: string) {
    await refreshSessionModel.deleteMany({
      where: {
        refreshToken,
      },
    });
  }
}
