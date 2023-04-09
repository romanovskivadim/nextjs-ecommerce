import { IUser } from "./IUser";

export interface IUserWithTokens {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  }