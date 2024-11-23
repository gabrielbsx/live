import { MergeType } from "@/shared/types/merge.type";
import { AuditDTO } from "shared/data/audit.dto";

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
