import { NextFunction, Request, Response } from 'express';

import dotenv from 'dotenv';

dotenv.config();

const DELAY = process.env.DELAY ?? 0;

export const delay = (_req: Request, _res: Response, next: NextFunction): void => {
  setTimeout(next, Number(DELAY));
};
