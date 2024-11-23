import { InputFilter } from "./dto.contract";

export interface Repository<T, U> {
  create: (data: T) => Promise<T>;
  update: (data: T) => Promise<T>;
  delete: (data: T) => Promise<T>;
  findById: (id: U) => Promise<T>;
  findByParams: (params: InputFilter<T>) => Promise<T[]>;
}
