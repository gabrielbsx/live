import { BadRequestException } from "../badRequest.error";

export class AlreadyExistsException extends BadRequestException {
  constructor() {
    super("ENTITY_ALREADY_EXISTS");
  }
}
