import jwt from "jsonwebtoken";
import type { UserProps } from "../../../client/src/assets/definition/lib";

type payloadProps = {
  email: string;
  firstName: string;
};

export const tokenJWT = async (userInfo: UserProps) => {
  const { email, firstName, ...rest } = userInfo;
  const payload = {
    email: email,
    firstName: firstName,
  };

  const token = jwt.sign(payload, process.env.APP_SECRET as string, {
    expiresIn: "24h",
  });

  return token;
};
