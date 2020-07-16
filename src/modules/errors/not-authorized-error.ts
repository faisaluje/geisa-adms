import { CustomError } from './custom-error';
import ErrorAttrs from '../../dtos/error-attrs.dto';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): ErrorAttrs[] {
    return [{ message: 'Not authorized' }];
  }
}
