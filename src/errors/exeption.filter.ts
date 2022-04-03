import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from '../logger';
import { HTTPError } from './http-error';
import { TYPES } from '../types';

export interface IExeptionFilter {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Error ${err.statusCode} : ${err.message}`);
      res.status(err.statusCode).send({ error: err.message });
    } else {
      this.logger.error(err.message);
      res.status(500).send({ error: err.message });
    }
  }
}
