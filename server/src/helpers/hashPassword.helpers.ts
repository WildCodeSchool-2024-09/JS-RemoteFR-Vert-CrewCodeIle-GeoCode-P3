import argon2 from "argon2";

const hashingOptions = {
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallellism: 1,
};

export const hashPasswordHelpers = async (password: string) => {
  return await argon2.hash(password, hashingOptions);
};
