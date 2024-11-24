import { AuthUserDTO } from "../dtos/authUserDto";
import { ValidatorContract } from "@/core/contracts/common/validatorContract";

export interface AuthUserValidation extends ValidatorContract<AuthUserDTO> {}
