import { describe, expect, it } from "vitest";
import { BcryptCryptographyAdapter } from "./bcryptCryptographyAdapter";

const makeSut = () => {
  const bcryptCryptography = new BcryptCryptographyAdapter();

  return { bcryptCryptography };
};

describe("Bcrypt Cryptography", () => {
  it("should be encrypt a string and then should be compare the same string with hashed string", async () => {
    // ARRANGE
    const { bcryptCryptography } = makeSut();
    const text = "simple_text_uncrypted";

    // ACT
    const hashedText = await bcryptCryptography.hash(text);

    // ASSERT
    expect(await bcryptCryptography.compare(hashedText, text)).toBeTruthy();
  });

  it("should be encrypt a string and then should be return a false value in compare function if is not the same string compared", async () => {
    // ARRANGE
    const { bcryptCryptography } = makeSut();
    const text = "simple_text_uncrypted";
    const invalidText = "simple_invalid_text_uncrypted";

    // ACT
    const hashedText = await bcryptCryptography.hash(text);

    // ASSERT
    expect(
      await bcryptCryptography.compare(hashedText, invalidText)
    ).toBeFalsy();
  });
});
