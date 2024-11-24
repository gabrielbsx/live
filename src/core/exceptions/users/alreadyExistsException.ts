import { BadRequestException } from "@/core/exceptions/badRequestException";

export class AlreadyExistsException extends BadRequestException {
  constructor() {
    super("ENTITY_ALREADY_EXISTS");
  }
}
