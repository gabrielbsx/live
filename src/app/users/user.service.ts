import { InputFilter, InputUpdate } from "@/core/contracts/dto.contract";
import {
  UserCreationInput,
  UserCreationOutput,
  UserDTO,
} from "./dtos/user.dto";
import { UserService } from "./contracts/user.service";
import { UserRepository } from "@/core/repository/user.repository";
import { UserEntity } from "@/core/entity/user.entity";
import { AuthUserInput, AuthUserOutput } from "./dtos/authUser.dto";
import { UserNotFound } from "./errors/userNotFound.error";
import { CryptographyContract } from "@/core/contracts/cryptography.contract";
import { WrongPassword } from "./errors/wrongPassword.error";
import { randomUUID } from "crypto";

export class UserServiceImpl implements UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _cryptography: CryptographyContract
  ) {}

  async auth(authUserDto: AuthUserInput): Promise<AuthUserOutput> {
    const { email, username, password } = authUserDto;

    const userFound = await this.filterByParams({
      email,
      username,
    });

    console.log(userFound);

    if (!userFound) {
      throw new UserNotFound();
    }

    const { password: passwordHashed } = userFound[0];

    const isPasswordMatched = await this._cryptography.compare(
      passwordHashed,
      password
    );

    if (!isPasswordMatched) {
      throw new WrongPassword();
    }

    return {
      token: randomUUID(),
    };
  }

  async create(
    userCreationInput: UserCreationInput
  ): Promise<UserCreationOutput> {
    const {
      passwordConfirmation: _,
      password,
      ...userWithoutAnyPassword
    } = userCreationInput;

    const passwordHashed = await this._cryptography.hash(password);

    const userEntity = new UserEntity({
      ...userWithoutAnyPassword,
      password: passwordHashed,
    });

    const userCreated = await this._userRepository.create(userEntity);

    const userCreatedMapped = {
      ...userWithoutAnyPassword,
      id: String(userCreated.audit.id),
      createdAt: new Date(userCreated.audit.createdAt!),
      createdBy: String(userCreated.audit.createdBy),
    };

    return userCreatedMapped;
  }

  async updateById(id: string, dto: InputUpdate<UserDTO>): Promise<UserDTO> {
    throw new Error("Service not implemented yet!");
  }

  async deleteById(id: string): Promise<UserDTO> {
    throw new Error("Service not implemented yet!");
  }

  async filterByParams(params: InputFilter<UserDTO>): Promise<UserDTO[]> {
    const userEntity = new UserEntity(params as UserDTO);

    const users = await this._userRepository.findByParams(userEntity);

    return users.map(({ user }) => ({
      ...user,
      id: String(user.id),
      createdAt: new Date(user.createdAt!),
      createdBy: String(user.createdBy),
    }));
  }
}
