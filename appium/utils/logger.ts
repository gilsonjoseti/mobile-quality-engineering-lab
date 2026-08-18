import fs from 'node:fs';
import path from 'node:path';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const logLevelOrder: Record<LogLevel, number> = {
  info: 1,
  warn: 2,
  error: 3,
  debug: 0,
};

const ensureLogDirectory = (): string => {
  const logDir = path.join(process.cwd(), 'reports', 'logs');
  fs.mkdirSync(logDir, { recursive: true });
  return logDir;
};

export const logger = {
  log(level: LogLevel, message: string, context: Record<string, unknown> = {}) {
    const currentLevel = logLevelOrder[process.env.LOG_LEVEL as LogLevel] ?? 1;
    const target = logLevelOrder[level] ?? 1;

    if (target < currentLevel) {
      return;
    }

    const payload = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context,
    };

    console.log(JSON.stringify(payload));
  },
  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  },
  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context);
  },
  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context);
  },
  error(message: string, context?: Record<string, unknown>) {
    this.log('error', message, context);
    const logDir = ensureLogDirectory();
    const filePath = path.join(logDir, `error-${Date.now()}.json`);
    fs.writeFileSync(filePath, JSON.stringify({ timestamp: new Date().toISOString(), message, context }, null, 2));
  },
};
