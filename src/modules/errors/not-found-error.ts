import { CustomError } from './custom-error';
import ErrorAttrs from '../../dtos/error-attrs.dto';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): ErrorAttrs[] {
    return [{ message: 'Not Found' }];
  }
}
