import { AuthUserDTO } from "../dtos/authUser.dto";
import { ValidatorContract } from "@/core/contracts/common/validator.contract";

export interface AuthUserValidation extends ValidatorContract<AuthUserDTO> {}
