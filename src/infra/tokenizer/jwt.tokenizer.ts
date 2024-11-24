import { TokenizerContract } from "@/core/contracts/infra/tokenizer.contract";
import { InvalidTokenException } from "@/core/exceptions/crypto/invalidToken.error";
import jwt from "jsonwebtoken";

export class JWTTokenizer implements TokenizerContract {
  async generate<T>(payload: T): Promise<string> {
    return await jwt.sign(
      JSON.stringify(payload),
      String(process.env.JWT_SECRET)
    );
  }

  async parse<T>(token: string): Promise<T> {
    try {
      const payloadParsed = (await jwt.verify(
        token,
        String(process.env.JWT_SECRET)
      )) as T;

      return payloadParsed;
    } catch (_error) {
      throw new InvalidTokenException();
    }
  }
}
