export interface TokenContract {
  generate<T>(payload: T): Promise<string>;
  parse<T>(token: string): Promise<T>;
}
