import { NotFoundException } from "@/core/exceptions/notFoundException";

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super("USER_NOT_FOUND");
  }
}
