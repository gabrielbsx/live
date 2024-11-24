import { InputCreation, InputFilter } from "../contracts/common/dtoContract";

export interface Repository<T, U> {
  create: (data: InputCreation<T>) => Promise<T>;
  update: (data: T) => Promise<T[]>;
  delete: (data: T) => Promise<T[]>;
  deleteById: (id: U) => Promise<T>;
  updateById: (id: U, data: Partial<T>) => Promise<T>;
  findById: (id: U) => Promise<T>;
  findByParams: (params: InputFilter<T>) => Promise<T[]>;
}
