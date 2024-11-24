import { BadRequestException } from "../badRequestException";

export class InvalidTokenException extends BadRequestException {
  constructor() {
    super("INVALID_TOKEN");
  }
}
