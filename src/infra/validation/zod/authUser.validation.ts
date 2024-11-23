import { z, ZodError } from "zod";
import ZodGetErrorMessage from "@/infra/validation/zod/getErrorMessage";
import { ValidationError } from "@/core/exceptions/validation.error";
import { AuthUserDTO } from "@/app/users/dtos/authUser.dto";
import { AuthUserValidation } from "@/app/users/validators/authUser.validation";

export class ZodAuthUserValidation implements AuthUserValidation {
  static schema = z
    .object({
      username: z.string().optional(),
      email: z.string().email().optional(),
      password: z.string(),
    })
    .refine(({ username, email }) => [username, email].some(Boolean), {
      message: "AUTH_USER_USERNAME_AND_EMAIL_ARE_NOT_FILLED",
      path: ["username_and_email"],
    });

  async validate(authUserDto: AuthUserDTO): Promise<AuthUserDTO> {
    try {
      return await ZodAuthUserValidation.schema.parseAsync(authUserDto);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(ZodGetErrorMessage.get(error));
      }

      throw new ValidationError(["UNEXPECTED_ERROR"]);
    }
  }
}
