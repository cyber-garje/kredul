import { Rule, Tree } from '@angular-devkit/schematics';

import { Schema } from '../../schema';

export function updateJestConfigJson(schema: Schema): Rule {
  return (tree: Tree): Tree => {
    const jestFile = tree.read('jest.config.js');
    const jestJson = jestFile!.toString();

    const appendIndex = jestJson.indexOf('],');
    const appendBlock = `\t\'<rootDir>/${schema.path}/${schema.libName}\',\n`;
    const jestUpdated = `${jestJson.slice(0, appendIndex)}${appendBlock}${jestJson.slice(appendIndex)}`

    tree.overwrite('jest.config.js', jestUpdated);
    return tree;
  }
}
