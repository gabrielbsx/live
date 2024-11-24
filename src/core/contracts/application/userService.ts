import { ServiceContract } from "@/core/contracts/application/serviceContract";
import {
  UserCreationInput,
  UserCreationOutput,
  UserDTO,
} from "@/app/users/dtos/userDto";
import { AuthUserInput, AuthUserOutput } from "@/app/users/dtos/authUserDto";

export interface UserService
  extends Omit<ServiceContract<UserDTO, string>, "create"> {
  auth: (authUserDto: AuthUserInput) => Promise<AuthUserOutput>;
  create: (userCreationInput: UserCreationInput) => Promise<UserCreationOutput>;
}
