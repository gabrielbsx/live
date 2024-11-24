import { UserController } from "@/core/contracts/application/user.controller";
import { UserControllerImpl } from "@/app/users/user.controller";
import { UserServiceImpl } from "@/app/users/user.service";
import { UserInMemoryRepository } from "@/infra/repository/in-memory/userInMemory.repository";
import { BcryptCryptography } from "@/infra/cryptography/bcryptCryptography";
import { ZodCreateUserValidation } from "@/infra/validation/zod/createUser.validation";
import { ZodAuthUserValidation } from "@/infra/validation/zod/authUser.validation";
import { JWTTokenizer } from "@/infra/tokenizer/jwt.tokenizer";

export class UserFactory {
  static create(): UserController {
    const userRepository = new UserInMemoryRepository();
    const cryptography = new BcryptCryptography();
    const jwtAdapter = new JWTTokenizer();

    const userService = new UserServiceImpl(
      userRepository,
      cryptography,
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
