import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const decodeAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  const { token } = req.cookies;

  if (token) {
    req['decodedToken'] = jwt.decode(token);
  }

  next();
};
