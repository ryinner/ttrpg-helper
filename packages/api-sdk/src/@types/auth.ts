interface ISignIn {
  username: string;
  password: string;
}

interface IAuthEntity {
  accessToken: string;
}

export type { IAuthEntity, ISignIn };
