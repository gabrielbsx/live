import { UserController } from "./contracts/user.controller";
import {
  UserCreationInput,
  UserCreationOutput,
  UserDTO,
} from "./dtos/user.dto";
import { CreateUserValidation } from "./validators/createUser.validation";
import { UserService } from "./contracts/user.service";
import { InputUpdate } from "@/core/contracts/dto.contract";
import { AuthUserValidation } from "./validators/authUser.validation";
import { AuthUserInput, AuthUserOutput } from "./dtos/authUser.dto";

export class UserControllerImpl implements UserController {
  constructor(
    private readonly _createUserValidation: CreateUserValidation,
    private readonly _userService: UserService,
    private readonly _authUserValidation: AuthUserValidation
  ) {}

  async auth(authUserDto: AuthUserInput): Promise<AuthUserOutput> {
    const validDto = await this._authUserValidation.validate(authUserDto);
    return await this._userService.auth(validDto);
  }

  async create(dto: UserCreationInput): Promise<UserCreationOutput> {
    const validDto = await this._createUserValidation.validate(dto);
    const userCreated = await this._userService.create(validDto);
    return userCreated;
  }

  async updateById(id: string, dto: InputUpdate<UserDTO>): Promise<UserDTO> {
    throw new Error("Not implemented yet!");
  }

  async deleteById(id: string): Promise<UserDTO> {
    throw new Error("Not implemented yet!");
  }

  async filterByParams(params: UserDTO): Promise<UserDTO> {
    throw new Error("Not implemented yet!");
  }
}
