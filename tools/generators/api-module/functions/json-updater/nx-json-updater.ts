import { Schema } from '../../schema';
import { Rule, Tree } from '@angular-devkit/schematics';
import { dasherize } from '@angular-devkit/core/src/utils/strings';

export function updateNxJson(schema: Schema): Rule {
  return (tree: Tree): Tree => {
    const nxJsonFile = tree.read('nx.json');
    const nxJson = JSON.parse(nxJsonFile!.toString());

    nxJson.projects = {
      ...nxJson.projects,
      ...newProjects(schema)
    }
    tree.overwrite('nx.json', JSON.stringify(nxJson, null, 2));
    return tree;
  }
}

export function newProjects(schema: Schema) {
  return {
    [`${dasherize(schema.libName)}`]: { "tags": [] }
  }
}
