export type AuthUserDTO = {
  username?: string;
  email?: string;
  password: string;
};

export interface AuthUserInput extends AuthUserDTO {}

export type AuthUserOutput = {
  token: string;
};
