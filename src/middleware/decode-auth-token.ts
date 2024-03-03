import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const decodeAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  const { token } = req.cookies;

  if (token) {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    req['decodedToken'] = jwt.decode(token);
  }

  next();
};
