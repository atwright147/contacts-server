import { Response } from 'express';

export const tokenCookie = (token, res: Response) => {
  const twentyFourHoursInSeconds = 24 * 60 * 60;
  const cookieOptions = {
    maxAge: twentyFourHoursInSeconds,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  };

  res.cookie('token', token, cookieOptions);
};
