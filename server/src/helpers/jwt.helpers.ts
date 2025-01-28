import jwt from "jsonwebtoken";
import type { UserProps } from "../../../client/src/assets/definition/lib";

type payloadProps = {
  email: string;
  firstName: string;
};

export const tokenJWT = async (payload: UserProps) => {
  const { email, firstName } = payload;

  const token = jwt.sign(payload, process.env.APP_SECRET as string, {
    expiresIn: "24h",
  });

  return token;
};
