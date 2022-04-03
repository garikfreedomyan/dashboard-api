import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from '../logger';
import { BaseController } from '../common';
import { HTTPError } from '../errors';
import { TYPES } from '../types';

export interface IUserController {
  signIn: (req: Request, res: Response, next: NextFunction) => void;
  sigUp: (req: Request, res: Response, next: NextFunction) => void;
}

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/sign-in', method: 'post', func: this.signIn },
      { path: '/sign-up', method: 'post', func: this.sigUp },
    ]);
  }

  signIn(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'signed in');
  }

  sigUp(req: Request, res: Response, next: NextFunction) {
    // this.created(res);
    next(new HTTPError(401, 'test error'));
  }
}
