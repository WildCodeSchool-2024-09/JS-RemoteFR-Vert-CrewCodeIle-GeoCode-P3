import jwt from "jsonwebtoken";
import type { UserProps } from "../../../client/src/assets/definition/lib";

type payloadProps = {
  email: string;
  firstName: string;
};

export const tokenJWT = async (userInfo: UserProps) => {
  const { email, role, ...rest } = userInfo;
  const payload = {
    email: email,
    role: role,
  };

  const token = jwt.sign(payload, process.env.APP_SECRET as string, {
    expiresIn: "24h",
  });

  return token;
};
