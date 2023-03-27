import { User } from "../user.interface";

export interface ResponseSignIn {
  token: string;
  user: User;
}
