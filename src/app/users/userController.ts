import { UserController } from "@/core/contracts/application/userController";
import {
  UserCreationInput,
  UserCreationOutput,
  UserDTO,
} from "./dtos/userDto";
import { UserService } from "@/core/contracts/application/userService";
import { AuthUserInput, AuthUserOutput } from "./dtos/authUserDto";
import { InputFilter, InputUpdate } from "@/core/contracts/common/dtoContract";
import { AuthUserValidation } from "./validators/authUserValidation";
import { CreateUserValidation } from "./validators/createUserValidation";

export class UserControllerImpl implements UserController {
  constructor(
    private readonly _createUserValidation: CreateUserValidation,
    private readonly _userService: UserService,
    private readonly _authUserValidation: AuthUserValidation
  ) {}

  async auth(dto: AuthUserInput): Promise<AuthUserOutput> {
    const authUserDto = await this._authUserValidation.validate(dto);
    return await this._userService.auth(authUserDto);
  }

  async create(dto: UserCreationInput): Promise<UserCreationOutput> {
    const craeteUserDto = await this._createUserValidation.validate(dto);
    const userCreated = await this._userService.create(craeteUserDto);
    return userCreated;
  }

  async updateById(_id: string, _dto: InputUpdate<UserDTO>): Promise<UserDTO> {
    throw new Error("Not implemented yet!");
  }

  async deleteById(_id: string): Promise<UserDTO> {
    throw new Error("Not implemented yet!");
  }

  async filterByParams(_params: InputFilter<UserDTO>): Promise<UserDTO> {
    throw new Error("Not implemented yet!");
  }
}
