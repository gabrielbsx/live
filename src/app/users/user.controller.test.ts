import { describe, expect, it } from "vitest";
import { UserCreationInput } from "./dtos/user.dto";
import { UserInMemoryRepository } from "@/infra/repository/in-memory/userInMemory.repository";
import { UserServiceImpl } from "./user.service";
import { UserControllerImpl } from "./user.controller";
import { BcryptCryptography } from "@/infra/cryptography/bcryptCryptography";
import { AuthUserInput } from "./dtos/authUser.dto";
import { ZodCreateUserValidation } from "@/infra/validation/zod/createUser.validation";
import { ZodAuthUserValidation } from "@/infra/validation/zod/authUser.validation";
import { JWTTokenizer } from "@/infra/tokenizer/jwt.tokenizer";

const makeSut = () => {
  // Infrastructure
  const cryptography = new BcryptCryptography();
  const userRepository = new UserInMemoryRepository();
  const tokenizer = new JWTTokenizer();

  // Services
  const userService = new UserServiceImpl(
    userRepository,
    cryptography,
    tokenizer
  );

  // Validations
  const createUserValidation = new ZodCreateUserValidation();
  const authUserValidation = new ZodAuthUserValidation();

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

const makeAuthUserDTO = (): AuthUserInput => ({
  email: "valid_email@valid.email",
  password: "valid_password",
  username: "valid_username",
});

describe("User Creation", () => {
  it("should create user correctly", async () => {
    // ARRANGE
    const userController = makeSut();
    const createUserDTO = makeCreateUserDTO();

    // ACT
    const userCreated = await userController.create(createUserDTO);

    const ignorableVars = {
      password: undefined,
      passwordConfirmation: undefined,
    };

    // ASSERT
    expect({ ...ignorableVars, ...userCreated }).toMatchObject({
      ...createUserDTO,
      ...ignorableVars,
    });
  });

  it("should throw an error if passwordConfirmation is invalid", async () => {
    // ARRANGE
    const userController = makeSut();
    const createUserDTO = makeCreateUserDTO();

    createUserDTO.password = "invalid_password";
    createUserDTO.passwordConfirmation = "invalid_password_confirmation";

    // ACT
    const userCreated = userController.create(createUserDTO);

    // ASSERT
    await expect(userCreated).rejects.toThrowError(
      "CREATE_USER_INVALID_PASSWORD_CONFIRMATION"
    );
  });

  it("should throw an error if email is invalid", async () => {
    // ARRANGE
    const userController = makeSut();
    const createUserDTO = makeCreateUserDTO();

    createUserDTO.email = "invalid_email";

    // ACT
    const userCreated = userController.create(createUserDTO);

    // ASSERT
    await expect(userCreated).rejects.toThrow("CREATE_USER_INVALID_EMAIL");
  });

  it("should throw an error if password is invalid", async () => {
    // ARRANGE
    const userController = makeSut();
    const createUserDTO = makeCreateUserDTO();

    createUserDTO.password = "";

    // ACT
    const userCreated = userController.create(createUserDTO);

    // ASSERT
    await expect(userCreated).rejects.toThrow("CREATE_USER_INVALID_PASSWORD");
  });
});

describe("User Authentication", () => {
  it("should be authentication with a valid user", async () => {
    // ARRANGE
    const userController = makeSut();

    const authUserDTO = makeAuthUserDTO();

    // ACT
    const authUser = await userController.auth(authUserDTO);

    // ASSERT
    expect(authUser).toBeTruthy();
    expect(authUser).toHaveProperty("token");
  });

  it("should be not authenticate with a invalid password", async () => {
    // ARRANGE
    const userController = makeSut();
    const authUserDTO = makeAuthUserDTO();

    authUserDTO.password = "invalid_password";

    // ACT
    const authUser = userController.auth(authUserDTO);

    // ASSERT
    await expect(authUser).rejects.toThrowError("WRONG_PASSWORD");
  });
});
