/**
 * Logger Utility
 * Provides logging functionality for test execution
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Logger {
  private static logLevel: LogLevel = LogLevel.INFO;

  /**
   * Set log level
   */
  static setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  /**
   * Get current timestamp
   */
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Format log message
   */
  private static formatMessage(level: LogLevel, message: string): string {
    return `[${this.getTimestamp()}] [${level}] ${message}`;
  }

  /**
   * Log debug message
   */
  static debug(message: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.formatMessage(LogLevel.DEBUG, message));
    }
  }

  /**
   * Log info message
   */
  static info(message: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage(LogLevel.INFO, message));
    }
  }

  /**
   * Log warning message
   */
  static warn(message: string): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message));
    }
  }

  /**
   * Log error message
   */
  static error(message: string, error?: Error): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(LogLevel.ERROR, message));
      if (error) {
        console.error(error);
      }
    }
  }

  /**
   * Check if should log based on log level
   */
  private static shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const currentIndex = levels.indexOf(this.logLevel);
    const messageIndex = levels.indexOf(level);
    return messageIndex >= currentIndex;
  }
}
