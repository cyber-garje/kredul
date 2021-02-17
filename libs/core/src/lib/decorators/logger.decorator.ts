import { CoreLogger } from '../core-logger/core-logger';

export function ApplyLogger() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    CoreLogger.i(JSON.stringify(target));
    CoreLogger.i(propertyKey);
    CoreLogger.i(JSON.stringify(descriptor));
  };
}

