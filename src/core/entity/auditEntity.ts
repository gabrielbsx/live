import { MergeType } from "@/shared/types/mergeType";

export type AuditProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
};

export class AuditEntity {
  #props: AuditProps;

  constructor(props: AuditProps) {
    this.#props = props;
  }

  static separateDataAndAudit<T>({
    id,
    createdAt,
    createdBy,
    deletedAt,
    deletedBy,
    updatedAt,
    updatedBy,
    ...props
  }: MergeType<T, AuditProps>) {
    return {
      audit: {
        id,
        createdAt,
        createdBy,
        deletedAt,
        deletedBy,
        updatedAt,
        updatedBy,
      },
      data: props,
    };
  }

  get audit() {
    return this.#props;
  }
}
