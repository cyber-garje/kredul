import { Logger, LoggerService } from '@nestjs/common';

export class CoreLogger extends Logger implements LoggerService {

  constructor(context?: string, isTimestampEnabled?: boolean) {
    super(context, isTimestampEnabled);
  }

  static d(context?: string, ...message: string[]): void {
    console.log(`${this.getTimestamp()} [DEBUG] ${message.join('\n')} ${context || ''}`);
  }

  static e(context?: string, trace?: string, ...message: string[]): void {
    console.log(`${this.getTimestamp()} [ERROR] ${context ? context + ' = ' : ''}${message.join('\n')} ${trace || ''} `);
  }

  static i(context?: string, ...message: string[]): void {
    console.log(`${this.getTimestamp()} [INFO] ${message.join('\n')} ${context || ''}`);
  }

  static v(context?: string, ...message: string[]): void {
    console.log(`${this.getTimestamp()} [VERB] ${message.join('\n')} ${context || ''}`);
  }

  static w(context?: string, ...message: string[]): void {
    console.log(`${this.getTimestamp()} [WARN] ${message.join('\n')} ${context || ''}`);
  }

  static getTimestamp = () => `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}]`;
}

export interface DmcLogger {
  message: string[];
  context?: string;
  trace?: string;
}
