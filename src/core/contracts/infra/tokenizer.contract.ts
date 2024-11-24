export interface TokenizerContract {
  generate<T>(payload: T): Promise<string>;
  parse<T>(token: string): Promise<T>;
}
