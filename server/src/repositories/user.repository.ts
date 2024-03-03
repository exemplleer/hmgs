import prisma from '../prisma';
import { Prisma } from '@prisma/client';

const userModel = prisma.person;

export default class UserRepository {
  static async createUser(data: Prisma.personCreateInput) {
    return await userModel.create({ data });
  }

  static async getUserByEmail(email: string) {
    return await userModel.findUnique({ where: { email } });
  }
}
