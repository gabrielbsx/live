import { AuditModel } from "./audit.model";

export interface UserModel extends AuditModel {
  username: string;
  name: string;
  email: string;
  password: string;
}
