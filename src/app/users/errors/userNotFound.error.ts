import { NotFoundException } from "@/core/exceptions/notFound.error";

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super("USER_NOT_FOUND");
  }
}
