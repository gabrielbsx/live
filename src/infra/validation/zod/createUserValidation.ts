import { z, ZodError } from "zod";
import ZodGetErrorMessage from "@/infra/validation/zod/getErrorMessage";
import { ValidationError } from "@/core/exceptions/validationException";
import { UserCreationInput } from "@/app/users/dtos/userDto";
import { CreateUserValidation } from "@/app/users/validators/createUserValidation";

export class ZodCreateUserValidation implements CreateUserValidation {
  static schema = z
    .object({
      username: z.string({ message: "CREATE_USER_INVALID_USERNAME" }),
      email: z.string().email("CREATE_USER_INVALID_EMAIL"),
      name: z.string({ message: "CREATE_USER_INVALID_NAME" }),
      password: z.string({ message: "CREATE_USER_INVALID_PASSWORD" }),
      passwordConfirmation: z.string({
        message: "CREATE_USER_INVALID_PASSWORD_CONFIRMATION",
      }),
    })
    .refine(
      ({ password, passwordConfirmation }) => password === passwordConfirmation,
      {
        message: "CREATE_USER_INVALID_PASSWORD_CONFIRMATION",
        path: ["passwordConfirmation"],
      }
    );

  async validate(
    userCreationInput: UserCreationInput
  ): Promise<UserCreationInput> {
    try {
      return await ZodCreateUserValidation.schema.parseAsync(userCreationInput);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(ZodGetErrorMessage.get(error));
      }

      throw new ValidationError(["UNEXPECTED_ERROR"]);
    }
  }
}
