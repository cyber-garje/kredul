import { apply, chain, MergeStrategy, mergeWith, move, Rule, template, url } from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';

import { Schema } from './schema';
import { updateAngularJson, updateJestConfigJson, updateNxJson, updatePackageJson } from './functions/json-updater';

export default function (schema: Schema): Rule {
  return chain([
    generateUiAction(schema),
    updatePackageJson(schema),
    updateAngularJson(schema),
    updateNxJson(schema),
    updateJestConfigJson(schema)
  ]);
};

function generateUiAction (schema: Schema): Rule {
  const templateDir = url('./files');
  const newTree = apply(templateDir, [
    move(normalize(`${schema.path}/${dasherize(schema.libName)}`)),
    template({
      ...strings,
      ...schema
    })
  ])
  return mergeWith(newTree, MergeStrategy.Default);
}
