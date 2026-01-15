export class CustomError extends Error {
  constructor(userMessage, devMessage, status = 400, details) {
    super(userMessage);
    this.status = status;
    this.devMessage = devMessage;
    this.details = details;
  }
}

export function throwCustomError(userMessage, { devMessage, status = 400, details } = {}) {
  throw new CustomError(userMessage, devMessage, status, details);
}
