import { ControllerContract } from "@/core/contracts/application/controllerContract";
import {
  UserCreationInput,
  UserCreationOutput,
  UserDTO,
} from "@/app/users/dtos/userDto";
import { AuthUserInput, AuthUserOutput } from "@/app/users/dtos/authUserDto";

export interface UserController
  extends Omit<ControllerContract<UserDTO, string>, "create"> {
  auth: (authUserDto: AuthUserInput) => Promise<AuthUserOutput>;
  create: (dto: UserCreationInput) => Promise<UserCreationOutput>;
}
