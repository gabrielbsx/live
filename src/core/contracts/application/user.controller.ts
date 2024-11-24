import { ControllerContract } from "@/core/contracts/application/controller.contract";
import {
  UserCreationInput,
  UserCreationOutput,
  UserDTO,
} from "@/app/users/dtos/user.dto";
import { AuthUserInput, AuthUserOutput } from "@/app/users/dtos/authUser.dto";

export interface UserController
  extends Omit<ControllerContract<UserDTO, string>, "create"> {
  auth: (authUserDto: AuthUserInput) => Promise<AuthUserOutput>;
  create: (dto: UserCreationInput) => Promise<UserCreationOutput>;
}
