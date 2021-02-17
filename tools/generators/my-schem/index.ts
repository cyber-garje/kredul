import {
  apply,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  template,
  url
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { Schema } from './schema';


function generateLibrary(schema: any): Rule {
  return externalSchematic('@nrwl/workspace', 'lib', {
    name: schema.name,
  });
}

function generateFiles(schema: any): Rule {

    const templateDir = url('./files');
    const newTree = apply(templateDir, [
      move(normalize('libs/' + dasherize(schema.name))),
      template({
        ...strings,
        ...schema
      })
    ]);

    return mergeWith(newTree, MergeStrategy.Default);
}

export default function (schema: Schema): Rule {
    return chain([
      // generateLibrary(schema),
      generateStoreAction(schema)
    ]);
};

const libDir = 'libs';
const storePath = 'src/store';
function generateStoreAction (schema: Schema): Rule {
  const templateDir = url('../my-schem/files/store');
  const newTree = apply(templateDir, [
    move(normalize(`${libDir}/${ dasherize(schema.name)}/${storePath}`)),
    template({
      ...strings,
      ...schema
    })
  ])

  return mergeWith(newTree, MergeStrategy.Default);
}
