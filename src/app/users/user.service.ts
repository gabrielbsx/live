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
import { UserNotFoundException } from "./errors/userNotFound.error";
import { CryptographyContract } from "@/core/contracts/cryptography.contract";
import { WrongPasswordException } from "./errors/wrongPassword.error";
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

    if (!userFound) {
      throw new UserNotFoundException();
    }

    const { password: passwordHashed } = userFound[0];

    const isPasswordMatched = await this._cryptography.compare(
      passwordHashed,
      password
    );

    if (!isPasswordMatched) {
      throw new WrongPasswordException();
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
    const userUpdateData = new UserEntity({ id, ...dto });

    const { user, audit } = await this._userRepository.update(userUpdateData);

    const userUpdatedDto = {
      ...user,
      id,
      createdBy: audit.createdBy!,
      createdAt: audit.createdAt!,
    };

    return userUpdatedDto;
  }

  async deleteById(id: string): Promise<UserDTO> {
    const userEntity = new UserEntity({
      id,
    } as UserDTO);

    const { user, audit } = await this._userRepository.delete(userEntity);

    return {
      ...user,
      id,
      createdBy: audit.createdBy!,
      createdAt: audit.createdAt!,
    };
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
