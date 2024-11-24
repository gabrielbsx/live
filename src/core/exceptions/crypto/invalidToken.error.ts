import { BadRequestException } from "../badRequest.error";

export class InvalidTokenException extends BadRequestException {
  constructor() {
    super("INVALID_TOKEN");
  }
}
