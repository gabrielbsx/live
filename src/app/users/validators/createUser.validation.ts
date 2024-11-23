import { UserCreationInput } from "../dtos/user.dto";
import { ValidatorContract } from "@/core/contracts/common/validator.contract";

export interface CreateUserValidation
  extends ValidatorContract<UserCreationInput> {}
