import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.SECRET as string;

export const checkAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  const { token } = req.cookies;

  if (!token) {
    res.status(403).json({ message: 'Please provide a token' });
  } else {
    jwt.verify(token, SECRET, (err, value) => {
      if (err) {
        res.status(500).json({ message: 'Failed to authenticate token' });
      }

      req['user'] = value?.data;
      next();
    });
  }
}
