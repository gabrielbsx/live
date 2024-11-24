import { UserCreationInput, UserCreationOutput, UserDTO } from "./dtos/userDto";
import { UserService } from "@/core/contracts/application/userService";
import { UserRepository } from "@/core/repositories/userRepository";
import { AuthUserInput, AuthUserOutput } from "./dtos/authUserDto";
import { UserNotFoundException } from "@/core/exceptions/users/userNotFoundException";
import { CryptographyContract } from "@/core/contracts/infra/cryptographyContract";
import { WrongPasswordException } from "@/core/exceptions/users/wrongPasswordException";
import { InputFilter, InputUpdate } from "@/core/contracts/common/dtoContract";
import { TokenContract } from "@/core/contracts/infra/tokenContract";

export class UserServiceImpl implements UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _cryptography: CryptographyContract,
    private readonly _tokenizer: TokenContract
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
