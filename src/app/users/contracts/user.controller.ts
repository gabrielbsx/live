import { ControllerContract } from "core/contracts/controller.contract";
import {
  UserCreationInput,
  UserCreationOutput,
  UserDTO,
} from "../dtos/user.dto";
import { AuthUserInput, AuthUserOutput } from "../dtos/authUser.dto";

export interface UserController
  extends Omit<ControllerContract<UserDTO, string>, "create"> {
  auth: (authUserDto: AuthUserInput) => Promise<AuthUserOutput>;
  create: (dto: UserCreationInput) => Promise<UserCreationOutput>;
}
