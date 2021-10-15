import jwt from 'jsonwebtoken';

import { User } from '../../types/user.interface';

export const generateToken = (data: User): string => {
  return jwt.sign({ data }, process.env.SECRET as jwt.Secret, { expiresIn: '24h' });
}
