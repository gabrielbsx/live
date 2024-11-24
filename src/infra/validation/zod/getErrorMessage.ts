import { ZodError } from "zod";

export default class ZodGetErrorMessage {
  static get(error: ZodError) {
    return error.errors.map(({ message }) => message);
  }
}
