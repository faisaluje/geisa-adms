import * as crypto from 'crypto';

export const getRandomString = (length: number) =>
  crypto.randomBytes(length).toString('hex');
