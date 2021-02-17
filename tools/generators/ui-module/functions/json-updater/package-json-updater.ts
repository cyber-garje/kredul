import { Schema } from '../../schema';
import { Rule, Tree } from '@angular-devkit/schematics';
import { dasherize } from '@angular-devkit/core/src/utils/strings';

export function updatePackageJson(schema: Schema): Rule {
  return (tree: Tree): Tree => {
    const packageJsonFile = tree.read('package.json');
    const packageJson = JSON.parse(packageJsonFile!.toString());

    packageJson.scripts = {
      ...packageJson.scripts,
      ...newScripts(schema)
    }
    tree.overwrite('package.json', JSON.stringify(packageJson, null, 2));
    return tree;
  }
}

function newScripts(schema: Schema) {
  return {
    [`${dasherize(schema.libName)}:test`]: `nx run ${dasherize(schema.libName)}:test`,
    [`${dasherize(schema.libName)}:build`]: `nx run ${dasherize(schema.libName)}:build`,
    [`${dasherize(schema.libName)}:start`]: `nx run ${dasherize(schema.libName)}:serve`,
    [`${dasherize(schema.libName)}:build:prod`]: `nx run ${dasherize(schema.libName)}:build:production`,
    [`${dasherize(schema.libName)}:start:prod`]: `nx run ${dasherize(schema.libName)}:serve:production`,
  }
}
