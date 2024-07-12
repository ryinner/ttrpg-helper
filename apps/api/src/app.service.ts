import { Injectable } from '@nestjs/common';
import * as packageJson from '../package.json';

@Injectable()
export class AppService {
  index() {
    const { version } = packageJson;
    return {
      state: 'ok',
      version,
      description: 'Simple app for help dungeon masters :)',
    };
  }
}
