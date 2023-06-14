import P from 'pino';
import pretty from 'pino-pretty';
import path from 'path';


export const LOGGER = (name?: string, level?: string) => P({ level: level || 'info', name: name || path.parse(__filename).name }, pretty({
        levelFirst: true,
        colorize: true,
    }))