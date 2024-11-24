import {
  UserCreationInput,
  UserCreationOutput,
  UserDTO,
} from "./dtos/user.dto";
import { UserService } from "@/core/contracts/application/user.service";
import { UserRepository } from "@/core/repositories/user.repository";
import { AuthUserInput, AuthUserOutput } from "./dtos/authUser.dto";
import { UserNotFoundException } from "@/core/exceptions/users/userNotFound.error";
import { CryptographyContract } from "@/core/contracts/infra/cryptography.contract";
import { WrongPasswordException } from "@/core/exceptions/users/wrongPassword.error";
import { InputFilter, InputUpdate } from "@/core/contracts/common/dto.contract";
import { TokenizerContract } from "@/core/contracts/infra/tokenizer.contract";

export class UserServiceImpl implements UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _cryptography: CryptographyContract,
    private readonly _tokenizer: TokenizerContract
  ) {}

  async auth(authUserDto: AuthUserInput): Promise<AuthUserOutput> {
    const { email, username, password } = authUserDto;

    const params = {
      ...(email && { email }),
      ...(username && { username }),
    };

    const userFound = (await this.filterByParams(params)).at(0);

    if (!userFound) {
      throw new UserNotFoundException();
    }

    const { password: passwordHashed } = userFound;

    const isPasswordMatched = await this._cryptography.compare(
      passwordHashed,
      password
    );

    if (!isPasswordMatched) {
      throw new WrongPasswordException();
    }

    Object.assign(userFound, { password: undefined });

    const token = await this._tokenizer.generate(userFound);

    return { token };
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

    const userCreationDto = {
      ...userWithoutAnyPassword,
      password: passwordHashed,
      createdBy: "1",
    };

    const userCreated = await this._userRepository.create(userCreationDto);

    const userCreatedMapped = {
      ...userWithoutAnyPassword,
      id: String(userCreated.id),
      createdAt: new Date(userCreated.createdAt!),
      createdBy: String(userCreated.createdBy),
    };

    return userCreatedMapped;
  }

  async updateById(id: string, dto: InputUpdate<UserDTO>): Promise<UserDTO> {
    const userUpdated = await this._userRepository.updateById(id, dto);

    Object.assign(userUpdated, { password: undefined });

    return userUpdated;
  }

  async deleteById(id: string): Promise<UserDTO> {
    const userDeleted = await this._userRepository.deleteById(id);

    return userDeleted;
  }

  async filterByParams(params: InputFilter<UserDTO>): Promise<UserDTO[]> {
    const users = await this._userRepository.findByParams(params);

    return users.map((user) => ({
      ...user,
      id: String(user.id),
      createdAt: new Date(user.createdAt!),
      createdBy: String(user.createdBy),
    }));
  }
}
