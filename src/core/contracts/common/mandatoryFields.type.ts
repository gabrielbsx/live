export type MandatoryFields<T, U> = Omit<
  T,
  "id" | "createdAt" | "createdBy"
> & {
  id: U;
  createdAt: Date;
  createdBy: string;
};
