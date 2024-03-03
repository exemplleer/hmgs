import { z } from 'zod';
import { userRegistrationSchema } from './../validations/user.validation';
import { userLoginSchema } from './../validations/user.validation';
import { JwtPayload } from 'jsonwebtoken';

export type UserRoles = 'USER' | 'ADMIN';

export type IUser = z.infer<typeof userRegistrationSchema>;
export type IUserLogin = z.infer<typeof userLoginSchema>;

export interface IUserDto extends IUser {
  id?: number;
  role: UserRoles;
}

export interface IUserPayload extends JwtPayload {
  id: number;
  email: string;
  role: UserRoles;
}
