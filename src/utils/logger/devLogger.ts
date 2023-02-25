import winston from 'winston';
import keys from '@config/keys';

const { format } = winston;
const { timestamp, align, printf, colorize, errors } = format;
const loggerFormat = format.combine(
    errors({ stack: true }),
    colorize({ all: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align(),
    printf((info) => {
        const { timestamp, level, message, ...metas } = info;
        return `${timestamp} [${level}]: ${message} ${Object.keys(metas).length ? JSON.stringify(metas, null, 2) : ''}`;
    }),
);

const consoleTransport = new winston.transports.Console({
    handleExceptions: true,
    silent: keys.CURRENT_ENV === 'test',
    level: (keys.LOG_LEVEL as string) || 'info',
});

const devLogger = winston.createLogger({
    level: (keys.LOG_LEVEL as string) || 'info',
    format: loggerFormat,
    transports: [consoleTransport],
    exitOnError: false,
    handleExceptions: true,
});

export default devLogger;
