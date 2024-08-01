interface ISignInDto {
  username: string;
  password: string;
}

interface IAuthEntity {
  accessToken: string;
}

export type { IAuthEntity, ISignInDto };
