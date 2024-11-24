import { BadRequestException } from "@/core/exceptions/badRequestException";

export class WrongPasswordException extends BadRequestException {
  constructor() {
    super("WRONG_PASSWORD");
  }
}
