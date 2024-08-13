import { createConfig, type IConfig } from './api';
import { CardApi } from './card';
import { CollectionApi } from './collection';

const modules = {
  cards: CardApi,
  collection: CollectionApi,
};

type TModules = keyof typeof modules;

interface ICreateSDKSettings<Modules extends TModules>
  extends Omit<IConfig, 'accessToken'> {
  modules: Modules[];
}

type TSDK<Modules extends TModules> = {
  [m in Modules]: InstanceType<(typeof modules)[m]>;
};

function createSDK<Modules extends TModules>({
  signIn,
  modules: modulesNames,
}: ICreateSDKSettings<Modules>): TSDK<Modules> {
  createConfig({
    signIn,
  });
  const app = {
    // TODO: maybe exist a better way to cast type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...modulesNames.reduce<any>((accumulator, moduleName) => {
      accumulator[moduleName] = new modules[moduleName]();
      return accumulator;
    }, {}),
  };

  return app;
}

export { createSDK, type ICreateSDKSettings, type TModules };
