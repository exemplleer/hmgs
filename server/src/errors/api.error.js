class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export class Unprocessable extends ApiError {
  constructor(message) {
    super(422, message);
  }
}

export class Conflict extends ApiError {
  constructor(message) {
    super(409, message);
  }
}

export class NotFound extends ApiError {
  constructor(message) {
    super(404, message);
  }
}

export class Forbidden extends ApiError {
  constructor(message) {
    super(403, message);
  }
}

export class Unauthorized extends ApiError {
  constructor(message) {
    super(401, message);
  }
}

export class BadRequest extends ApiError {
  constructor(message) {
    super(400, message);
  }
}

class ErrorUtils {
  static catchError(res, error) {
    console.log(error);
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export default ErrorUtils;
