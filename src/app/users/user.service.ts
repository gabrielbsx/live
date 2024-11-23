import { InputUpdate } from "@/core/contracts/dto.contract";
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

export class UserServiceImpl implements UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async auth(authUserDto: AuthUserInput): Promise<AuthUserOutput> {
    const { email, username, password } = authUserDto;

    const userFound = await this.filterByParams({
      email,
      username,
    });

    if (!userFound) {
      throw new UserNotFound();
    }

    
  }

  async create(
    userCreationInput: UserCreationInput
  ): Promise<UserCreationOutput> {
    const {
      passwordConfirmation: _,
      password,
      ...userWithoutAnyPassword
    } = userCreationInput;

    const userEntity = new UserEntity({
      ...userWithoutAnyPassword,
      password,
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

  async filterByParams(params: UserDTO): Promise<UserDTO> {
    throw new Error("Service not implemented yet!");
  }
}
