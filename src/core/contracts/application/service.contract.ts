import {
  InputCreation,
  InputFilter,
  InputUpdate,
} from "../common/dto.contract";

export interface ServiceContract<T, U> {
  create: (dto: InputCreation<T>) => Promise<T>;
  updateById: (id: U, dto: InputUpdate<T>) => Promise<T>;
  deleteById: (id: U) => Promise<T>;
  filterByParams: (params: InputFilter<T>) => Promise<T[]>;
}
