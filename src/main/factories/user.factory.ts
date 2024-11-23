import { UserController } from "@/app/users/contracts/user.controller";
import { UserControllerImpl } from "@/app/users/user.controller";
import { UserServiceImpl } from "@/app/users/user.service";
import { CreateUserValidation } from "@/app/users/validators/createUser.validation";
import { UserInMemoryRepository } from "@/infra/repository/in-memory/userInMemory.repository";

export class UserFactory {
  static create(): UserController {
    const userRepository = new UserInMemoryRepository();
    const userService = new UserServiceImpl(userRepository);
    const createUserValidation = new CreateUserValidation();
    const userController = new UserControllerImpl(
      createUserValidation,
      userService
    );

    return userController;
  }
}
