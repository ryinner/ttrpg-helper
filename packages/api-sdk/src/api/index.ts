import type { ISignInDto } from '../@types/auth';
import { CardApi } from './card';
import { CollectionApi } from './collection';

const modules = {
  cards: CardApi,
  collection: CollectionApi,
  auth: CardApi,
};

type TModules = keyof typeof modules;
type TModulesAvailableCreateSDKSettings = Exclude<TModules, 'auth'>;

interface ICreateSDKSettings<
  Modules extends TModulesAvailableCreateSDKSettings,
> {
  signIn: ISignInDto;
  modules: Modules[];
}

type TSDK<Modules extends TModulesAvailableCreateSDKSettings> = {
  [m in Modules]: InstanceType<(typeof modules)[m]>;
};

function createSDK<Modules extends TModulesAvailableCreateSDKSettings>({
  signIn,
  modules: modulesNames,
}: ICreateSDKSettings<Modules>): TSDK<Modules> {
  const apiConfig = {
    signIn,
  };
  const app = {
    // TODO: think maybe in can be a better way to cast type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...modulesNames.reduce<any>((accumulator, moduleName) => {
      accumulator[moduleName] = new modules[moduleName](apiConfig);
      return accumulator;
    }, {}),
  };

  return app;
}

const sdk = createSDK({
  signIn: {
    username: 'test',
    password: 'test',
  },
  modules: ['cards'],
});

console.log(sdk.cards.getOne(1));
