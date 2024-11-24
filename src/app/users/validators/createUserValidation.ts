import { UserCreationInput } from "../dtos/userDto";
import { ValidatorContract } from "@/core/contracts/common/validatorContract";

export interface CreateUserValidation
  extends ValidatorContract<UserCreationInput> {}
