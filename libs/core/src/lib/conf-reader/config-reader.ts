import { readFileSync } from 'graceful-fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

export class ConfigReader {

  readYaml<T>(...paths: string[]): T {
    return yaml.load(
      readFileSync(join(...paths), 'utf8')
    );
  };
}
