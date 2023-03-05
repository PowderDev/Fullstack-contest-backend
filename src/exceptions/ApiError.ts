export default class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: unknown[],
  ) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static Unauthorized(message: string, errors?: unknown[]) {
    return new ApiError(401, message, errors)
  }

  static BadRequest(message: string, errors?: unknown[]) {
    return new ApiError(400, message, errors)
  }

  static NotFound(message: string, errors?: unknown[]) {
    return new ApiError(404, message, errors)
  }
}
