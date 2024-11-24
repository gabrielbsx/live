export type IgnorableFields =
  | "id"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "deletedBy"
  // | "createdBy"
  | "updatedBy";

export type InputCreation<T> = Omit<T, IgnorableFields>;

export type InputUpdate<T> = Omit<T, IgnorableFields>;

export type InputFilter<T> = Partial<T>;
