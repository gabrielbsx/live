import { ServiceContract } from "core/contracts/service.contract";
import {
  UserCreationInput,
  UserCreationOutput,
  UserDTO,
} from "../dtos/user.dto";
import { AuthUserInput, AuthUserOutput } from "../dtos/authUser.dto";

export interface UserService
  extends Omit<ServiceContract<UserDTO, string>, "create"> {
  auth: (authUserDto: AuthUserInput) => Promise<AuthUserOutput>;
  create: (userCreationInput: UserCreationInput) => Promise<UserCreationOutput>;
}
