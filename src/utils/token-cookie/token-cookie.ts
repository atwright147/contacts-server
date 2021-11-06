import { CookieOptions, Response } from 'express';

export const tokenCookie = (token, res: Response) => {
  const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

  const cookieOptions: CookieOptions = {
    // domain: '.contacts.com',
    maxAge: twentyFourHoursInMilliseconds,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: true,
  };

  res.cookie('token', token, cookieOptions);
};
