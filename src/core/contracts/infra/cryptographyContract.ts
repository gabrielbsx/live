export interface CryptographyContract {
  compare: (hashed: string, data: string) => Promise<boolean>;
  hash: (data: string) => Promise<string>;
}
