import jwt from 'jsonwebtoken';

export type TokenPayload = Record<string, unknown>;

export const generateToken = (payload: TokenPayload, expiresIn = '2h'): string => {
  return jwt.sign({ ...payload }, process.env.SECRET as jwt.Secret, { expiresIn });
};
