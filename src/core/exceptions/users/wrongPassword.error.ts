import { BadRequestException } from "../badRequest.error";

export class WrongPasswordException extends BadRequestException {
  constructor() {
    super("WRONG_PASSWORD");
  }
}
