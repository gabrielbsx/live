import { CryptographyContract } from "@/core/contracts/infra/cryptographyContract";
import bcrypt from "bcryptjs";

export class BcryptCryptographyAdapter implements CryptographyContract {
  async compare(hashed: string, data: string): Promise<boolean> {
    return await bcrypt.compare(data, hashed);
  }

  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }
}
