export interface EntityMapper<T, U> {
  toData: (entity: T) => Promise<U>;
  toEntity: (data: U) => Promise<T>;
}
