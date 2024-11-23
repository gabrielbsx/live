import { BadRequest } from "@/core/exceptions/badRequest.error";

export class WrongPassword extends BadRequest {
  constructor() {
    super("WRONG_PASSWORD");
  }
}
