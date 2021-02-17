import { Schema } from '../../schema';
import { Rule, Tree } from '@angular-devkit/schematics';
import { dasherize } from '@angular-devkit/core/src/utils/strings';


export function updateAngularJson(schema: Schema): Rule {
  return (tree: Tree): Tree => {
    const angularJsonFile = tree.read('angular.json');
    const angularJson = JSON.parse(angularJsonFile!.toString());

    angularJson.projects = {
      ...angularJson.projects,
      ...newProjects(schema),
      ...newProjectsE2E(schema)
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
        ...newArchitectServer(dasherizedLibName, libPath),
        ...newArchitectExtractI18n(dasherizedLibName),
        ...newArchitectLinter(dasherizedLibName, libPath),
        ...newArchitectTester(dasherizedLibName, libPath)
      }
    }
  }
}


function newArchitectBuilder(dasherizedLibName: string, libPath: string) {
  return {
    'build': {
      'builder': '@angular-devkit/build-angular:browser',
      'options': {
        'outputPath': `dist/${libPath}${dasherizedLibName}`,
        'index': `${libPath}/${dasherizedLibName}/src/index.html`,
        'main': `${libPath}/${dasherizedLibName}/src/main.ts`,
        'polyfills': `${libPath}/${dasherizedLibName}/src/polyfills.ts`,
        'tsConfig': `${libPath}/${dasherizedLibName}/tsconfig.app.json`,
        'aot': true,
        'assets': [`${libPath}/${dasherizedLibName}/src/favicon.ico`, `${libPath}/${dasherizedLibName}/src/assets`],
        'styles': [`${libPath}/${dasherizedLibName}/src/styles.scss`],
        'scripts': []
      },
      'configurations': {
        'production': {
          'fileReplacements': [
            {
              'replace': `${libPath}/${dasherizedLibName}/src/environments/environment.ts`,
              'with': `${libPath}/${dasherizedLibName}/src/environments/environment.prod.ts`
            }
          ],
          'optimization': true,
          'outputHashing': 'all',
          'sourceMap': false,
          'namedChunks': false,
          'extractLicenses': true,
          'vendorChunk': false,
          'buildOptimizer': true,
          'budgets': [
            {
              'type': 'initial',
              'maximumWarning': '2mb',
              'maximumError': '5mb'
            },
            {
              'type': 'anyComponentStyle',
              'maximumWarning': '6kb',
              'maximumError': '10kb'
            }
          ]
        }
      }
    }
  }
}

function newArchitectServer(dasherizedLibName: string, libPath: string) {
  return {
    'serve': {
      'builder': '@angular-devkit/build-angular:dev-server',
      'options': {
        'browserTarget': `${dasherizedLibName}:build`,
        'proxyConfig': `${libPath}/${dasherizedLibName}/proxy.conf.json`,
      },
      'configurations': {
        'production': {
          'browserTarget': `${dasherizedLibName}:build:production`
        }
      }
    }
  }
}

function newArchitectExtractI18n(dasherizedLibName: string) {
  return {
    'extract-i18n': {
      'builder': '@angular-devkit/build-angular:extract-i18n',
      'options': {
        'browserTarget': `${dasherizedLibName}:build`
      }
    },
  }
}

function newArchitectLinter(dasherizedLibName: string, libPath: string) {
  return {
    "lint": {
      "builder": "@nrwl/linter:eslint",
      "options": {
        "lintFilePatterns": [
          `${libPath}/${dasherizedLibName}/src/**/*.ts`,
          `${libPath}/${dasherizedLibName}/src/**/*.html`
        ]
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

function newProjectsE2E(schema: Schema) {
  const dasherizedLibName = `${dasherize(schema.libName)}`;
  const dasherizedLibNameE2E = `${dasherizedLibName}-e2e`;
  const libPath = schema.path;

  return {
    'architect': {
      [`${dasherizedLibNameE2E}`]: {
        "root": `${libPath}/${dasherizedLibNameE2E}`,
        "sourceRoot": `${libPath}/${dasherizedLibNameE2E}/src`,
        "projectType": "application",
        "architect": {
          ...newArchitectE2E(dasherizedLibName, dasherizedLibNameE2E, libPath),
          ...newArchitectE2ELinter(dasherizedLibNameE2E, libPath)
        }
      }
    }
  }
}

  function newArchitectE2E(dasherizedLibName: string, dasherizedLibNameE2E: string, libPath: string) {
    return {
      'e2e': {
        'builder': '@nrwl/cypress:cypress',
        'options': {
          'cypressConfig': `${libPath}/${dasherizedLibNameE2E}/cypress.json`,
          'tsConfig': `${libPath}/${dasherizedLibNameE2E}/tsconfig.e2e.json`,
          'devServerTarget': `${dasherizedLibName}:serve`
        },
        'configurations': {
          'production': {
            'devServerTarget': `${dasherizedLibName}:serve:production`
          }
        }
      }
    }
  }

  function newArchitectE2ELinter(dasherizedLibNameE2E: string, libPath: string) {
    return {
      'lint': {
        'builder': '@nrwl/linter:eslint',
        'options': {
          'lintFilePatterns': [`${libPath}/${dasherizedLibNameE2E}/**/*.{js,ts}`]
        }
      }
    }
  }
