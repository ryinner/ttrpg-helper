export interface BaseConfig {
  port: number;
}

export default function baseConfig(): { base: BaseConfig } {
  return {
    base: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    },
  };
}
