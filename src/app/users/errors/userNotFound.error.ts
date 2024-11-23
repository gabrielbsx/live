import { BadRequest } from "@/core/exceptions/badRequest.error";

export class UserNotFound extends BadRequest {
  constructor() {
    super("USER_NOT_FOUND");
  }
}
