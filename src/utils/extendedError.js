import httpStatus from "http-status"

class ExtendedError extends Error {
  constructor(
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false
  ) {
    super(message);
    this.name = "ExtendedError";
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
  }
}

export default ExtendedError;
