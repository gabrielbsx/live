import { MergeType } from "@/shared/types/mergeType";
import { AuditDTO } from "@/shared/data/auditDto";

interface UserPropsDTO {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface UserDTO extends MergeType<UserPropsDTO, AuditDTO> {}

export interface UserCreationInput extends UserPropsDTO {
  passwordConfirmation: string;
}

export interface UserCreationOutput extends Omit<UserDTO, "password"> {}
