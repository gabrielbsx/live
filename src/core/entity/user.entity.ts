import { MergeType } from "@/shared/types/merge.type";
import { AuditEntity, AuditProps } from "./audit.entity";

type UserProps = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export class UserEntity extends AuditEntity {
  #props: UserProps;

  constructor(props: MergeType<UserProps, AuditProps>) {
    const { audit, data } = AuditEntity.separateDataAndAudit(props);

    super(audit);

    this.#props = data;
  }

  get user() {
    return {
      ...this.#props,
      ...this.audit,
    };
  }
}
