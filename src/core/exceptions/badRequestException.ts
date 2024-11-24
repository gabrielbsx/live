export class BadRequestException extends Error {
  constructor(message?: string) {
    super(message || "BAD_REQUEST");
  }
}
