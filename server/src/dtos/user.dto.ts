import { IUserDto } from '../types/user.types';

export default class UserDto implements IUserDto {
  id;
  email;
  firstName;
  lastName;
  password;
  role;

  constructor(model: any) {
    this.id = model.id;
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.password = model.password;
    this.role = model.role;
  }
}
