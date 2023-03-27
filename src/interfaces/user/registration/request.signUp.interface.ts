import { Roles } from '../roles';

export interface RequestSignUp {
  firstName: string;
  lastName: string;
  email: string;
  ddd: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
  roles: Roles;
  photo: string;
}
