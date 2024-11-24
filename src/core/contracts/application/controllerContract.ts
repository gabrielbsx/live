import {
  InputCreation,
  InputFilter,
  InputUpdate,
} from "../common/dtoContract";

export interface ControllerContract<T, U> {
  create: (dto: InputCreation<T>) => Promise<T>;
  updateById: (id: U, dto: InputUpdate<T>) => Promise<T>;
  deleteById: (id: U) => Promise<T>;
  filterByParams: (params: InputFilter<T>) => Promise<T>;
}
