export interface AuthConfig {
  enabled: boolean;
  jwt: {
    secret: string;
  };
}

export function authConfig(): { auth: AuthConfig } {
  return {
    auth: {
      enabled: true,
      jwt: {
        secret: process.env.JWT_TOKEN ?? 'default-secret',
      },
    },
  };
}
