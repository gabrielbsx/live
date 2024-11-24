import { ServiceContract } from "./service.contract";
import {
  UserCreationInput,
  UserCreationOutput,
  UserDTO,
} from "@/app/users/dtos/user.dto";
import { AuthUserInput, AuthUserOutput } from "@/app/users/dtos/authUser.dto";

export interface UserService
  extends Omit<ServiceContract<UserDTO, string>, "create"> {
  auth: (authUserDto: AuthUserInput) => Promise<AuthUserOutput>;
  create: (userCreationInput: UserCreationInput) => Promise<UserCreationOutput>;
}
