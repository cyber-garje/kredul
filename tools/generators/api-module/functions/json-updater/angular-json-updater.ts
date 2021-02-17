import { Schema } from '../../schema';
import { Rule, Tree } from '@angular-devkit/schematics';
import { dasherize } from '@angular-devkit/core/src/utils/strings';


export function updateAngularJson(schema: Schema): Rule {
  return (tree: Tree): Tree => {
    const angularJsonFile = tree.read('angular.json');
    const angularJson = JSON.parse(angularJsonFile!.toString());

    angularJson.projects = {
      ...angularJson.projects,
      ...newProjects(schema)
    }

    tree.overwrite('angular.json', JSON.stringify(angularJson, null, 2));
    return tree;
  }
}

function newProjects(schema: Schema) {
  const dasherizedLibName = dasherize(schema.libName);
  const libPath = schema.path;

  return {
    [`${dasherizedLibName}`]: {
      "root": `${libPath}/${dasherizedLibName}`,
      "sourceRoot": `${libPath}/${dasherizedLibName}/src`,
      "projectType": "application",
      "prefix": `${dasherizedLibName}`,
      "architect": {
        ...newArchitectBuilder(dasherizedLibName, libPath),
        ...newArchitectServer(dasherizedLibName),
        ...newArchitectLinter(dasherizedLibName, libPath),
        ...newArchitectTester(dasherizedLibName, libPath)
      }
    }
  }
}




function newArchitectBuilder(dasherizedLibName: string, libPath: string) {
  return {
    "build": {
      "builder": "@nrwl/node:build",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": `dist/${libPath}/${dasherizedLibName}`,
        "main": `${libPath}/${dasherizedLibName}/src/main.ts`,
        "tsConfig": `${libPath}/${dasherizedLibName}/tsconfig.app.json`,
        "assets": [`${libPath}/${dasherizedLibName}/src/assets`]
      },
      "configurations": {
        "production": {
          "optimization": true,
          "extractLicenses": true,
          "inspect": false,
          "fileReplacements": [
            {
              "replace": `${libPath}/${dasherizedLibName}/src/environments/environment.ts`,
              "with": `${libPath}/${dasherizedLibName}/src/environments/environment.prod.ts`
            }
          ]
        }
      }
    }
  }
}

function newArchitectServer(dasherizedLibName: string) {
  return {
    "serve": {
      "builder": "@nrwl/node:execute",
      "options": {
        "buildTarget": `${dasherizedLibName}:build`
      }
    }
  }
}

function newArchitectLinter(dasherizedLibName: string, libPath: string) {
  return {
    "lint": {
      "builder": "@nrwl/linter:eslint",
      "options": {
        "lintFilePatterns": [`${libPath}/${dasherizedLibName}/**/*.ts`]
      }
    }
  }
}

function newArchitectTester(dasherizedLibName: string, libPath: string) {
  return {
    "test": {
      "builder": "@nrwl/jest:jest",
      "outputs": [`coverage/${libPath}/${dasherizedLibName}`],
      "options": {
        "jestConfig": `${libPath}/${dasherizedLibName}/jest.config.js`,
        "passWithNoTests": true
      }
    }
  }
}
