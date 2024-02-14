import { Response } from 'express';

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class Unprocessable extends ApiError {
  constructor(message: string) {
    super(422, message);
  }
}

export class Conflict extends ApiError {
  constructor(message: string) {
    super(409, message);
  }
}

export class NotFound extends ApiError {
  constructor(message: string) {
    super(404, message);
  }
}

export class Forbidden extends ApiError {
  constructor(message: string) {
    super(403, message);
  }
}

export class Unauthorized extends ApiError {
  constructor(message: string) {
    super(401, message);
  }
}

export class BadRequest extends ApiError {
  constructor(message: string) {
    super(400, message);
  }
}

class ErrorUtils {
  static catchError(res: Response, error: any) {
    console.error('💥', error);

    if (error instanceof ApiError) {
      return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

export default ErrorUtils;
