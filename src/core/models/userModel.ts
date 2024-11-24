import { AuditModel } from "./auditModel";

export interface UserModel extends AuditModel {
  username: string;
  name: string;
  email: string;
  password: string;
}
