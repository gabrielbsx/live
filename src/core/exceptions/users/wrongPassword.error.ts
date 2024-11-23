import { BadRequestException } from "@/core/exceptions/badRequest.error";

export class WrongPasswordException extends BadRequestException {
  constructor() {
    super("WRONG_PASSWORD");
  }
}
