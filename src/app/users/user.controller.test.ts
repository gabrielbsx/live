import { describe, expect, it } from "vitest";
import { UserCreationInput } from "./dtos/user.dto";
import { UserInMemoryRepository } from "@/infra/repository/in-memory/userInMemory.repository";
import { UserServiceImpl } from "./user.service";
import { CreateUserValidation } from "./validators/createUser.validation";
import { UserControllerImpl } from "./user.controller";
import { AuthUserValidation } from "./validators/authUser.validation";
import { BcryptCryptography } from "@/infra/criptography/bcryptCryptography";

const makeSut = () => {
  // Infrastructure
  const cryptography = new BcryptCryptography();
  const userRepository = new UserInMemoryRepository();

  // Services
  const userService = new UserServiceImpl(userRepository, cryptography);

  // Validations
  const createUserValidation = new CreateUserValidation();
  const authUserValidation = new AuthUserValidation();

  // App Controller
  const userController = new UserControllerImpl(
    createUserValidation,
    userService,
    authUserValidation
  );

  return userController;
};

const makeCreateUserDTO = (): UserCreationInput => ({
  username: "valid_username",
  name: "valid_name",
  email: "valid_email@valid.email",
  password: "valid_password",
  passwordConfirmation: "valid_password",
});

describe("User Creation", () => {
  it("should create user correctly", async () => {
    const userController = makeSut();
    const createUserDTO = makeCreateUserDTO();

    const userCreated = await userController.create(createUserDTO);

    const ignorableVars = {
      password: undefined,
      passwordConfirmation: undefined,
    };

    expect({ ...ignorableVars, ...userCreated }).toMatchObject({
      ...createUserDTO,
      ...ignorableVars,
    });
  });

  it("should throw an error if passwordConfirmation is invalid", async () => {
    const userController = makeSut();
    const createUserDTO = makeCreateUserDTO();

    createUserDTO.password = "invalid_password";
    createUserDTO.passwordConfirmation = "invalid_password_confirmation";

    const userCreated = userController.create(createUserDTO);

    await expect(userCreated).rejects.toThrowError(
      "CREATE_USER_INVALID_PASSWORD_CONFIRMATION"
    );
  });

  it("should throw an error if email is invalid", async () => {
    const userController = makeSut();
    const createUserDTO = makeCreateUserDTO();

    createUserDTO.email = "invalid_email";

    const userCreated = userController.create(createUserDTO);

    await expect(userCreated).rejects.toThrow("CREATE_USER_INVALID_EMAIL");
  });

  it("should throw an error if password is invalid", async () => {
    const userController = makeSut();
    const createUserDTO = makeCreateUserDTO();

    createUserDTO.password = "";

    const userCreated = userController.create(createUserDTO);

    await expect(userCreated).rejects.toThrow("CREATE_USER_INVALID_PASSWORD");
  });
});
