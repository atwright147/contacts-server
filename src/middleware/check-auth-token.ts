import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET = process.env.SECRET as string;
const DISABLE_AUTH = JSON.parse(process.env.DISABLE_AUTH ?? '');

export const checkAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  if (DISABLE_AUTH) {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    req['user'] = 1;
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    req['decodedToken'] = { sub: 1 };
    next();
    return;
  }

  const { token } = req.cookies;

  if (!token) {
    res.status(403).json({ message: 'Please provide a token' });
  } else {
    jwt.verify(token, SECRET, (err, value) => {
      if (err) {
        res.status(500).json({ message: 'Failed to authenticate token' });
      }

      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      req['user'] = value?.data;
      next();
    });
  }
};
