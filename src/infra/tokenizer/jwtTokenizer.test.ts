import { describe, expect, it } from "vitest";
import { JWTTokenizer } from "./jwt.tokenizer";

const makeSut = () => {
  const jwtTokenizer = new JWTTokenizer();

  return { jwtTokenizer };
};

describe("JWT Tokenizer", () => {
  it("should be create a token string with any payload", async () => {
    // ARRANGE
    const { jwtTokenizer } = makeSut();
    const payload = {
      any_key: "any_value",
      another_key: "anther_value",
    };

    // ACT
    const token = await jwtTokenizer.generate(payload);

    // ASSERT
    expect(token).toBeTypeOf("string");
    expect(await jwtTokenizer.parse(token)).toStrictEqual(payload);
  });

  it("should throw an malformed error if token is invalid when try to parse", async () => {
    // ARRANGE
    const { jwtTokenizer } = makeSut();
    const token = "invalid_token";

    // ACT
    const payloadParsed = jwtTokenizer.parse(token);

    // ASSERT
    expect(payloadParsed).rejects.toThrowError("INVALID_TOKEN");
  });
});
