import path from 'path';
import { readdirSync } from 'fs';
import * as imports from './index';
import { describe, test, expect } from 'bun:test';

describe('exports api-sdk', () => {
  test('all @types are exported', () => {
    const typesDir = path.resolve(__dirname, '@types');
    const typesFiles = readdirSync(typesDir);

    for (const fileName of typesFiles) {
      if (fileName.includes('test')) {
        continue;
      }
      const importName = fileName.replace('.ts', '');
      expect(importName in imports);
    }
  });
});
