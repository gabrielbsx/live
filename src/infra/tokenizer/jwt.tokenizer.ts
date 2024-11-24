import { TokenizerContract } from "@/core/contracts/infra/tokenizer.contract";
import jwt from "jsonwebtoken";

export class JWTTokenizer implements TokenizerContract {
  async generate<T>(payload: T): Promise<string> {
    return await jwt.sign(
      JSON.stringify(payload),
      String(process.env.JWT_SECRET)
    );
  }

  async parse<T>(token: string): Promise<T> {
    return (await jwt.verify(token, String(process.env.JWT_SECRET))) as T;
  }
}
