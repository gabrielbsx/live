export interface ValidatorContract<T> {
  validate(dto: T): Promise<T>;
}
