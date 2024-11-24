import { NotFoundException } from "../notFound.error";

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super("USER_NOT_FOUND");
  }
}
