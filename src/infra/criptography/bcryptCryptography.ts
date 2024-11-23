import { CryptographyContract } from "@/core/contracts/cryptography.contract";
import bcrypt from "bcryptjs";

export class BcryptCryptography implements CryptographyContract {
  async compare(hashed: string, data: string): Promise<boolean> {
    return await bcrypt.compare(data, hashed);
  }

  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }
}
