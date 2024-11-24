import { UserController } from "@/core/contracts/application/userController";
import { UserControllerImpl } from "@/app/users/userController";
import { UserServiceImpl } from "@/app/users/userService";
import { UserInMemoryRepository } from "@/infra/repository/in-memory/userInMemoryRepository";
import { BcryptCryptographyAdapter } from "@/infra/cryptography/bcryptCryptographyAdapter";
import { ZodCreateUserValidation } from "@/infra/validation/zod/createUserValidation";
import { ZodAuthUserValidation } from "@/infra/validation/zod/authUserValidation";
import { JWTAdapter } from "@/infra/token/jwtAdapter";

export class UserFactory {
  static create(): UserController {
    const userRepository = new UserInMemoryRepository();
    const bcryptAdapter = new BcryptCryptographyAdapter();
    const jwtAdapter = new JWTAdapter();

    const userService = new UserServiceImpl(
      userRepository,
      bcryptAdapter,
      jwtAdapter
    );

    const createUserValidation = new ZodCreateUserValidation();
    const authUserValidation = new ZodAuthUserValidation();

    const userController = new UserControllerImpl(
      createUserValidation,
      userService,
      authUserValidation
    );

    return userController;
  }
}
