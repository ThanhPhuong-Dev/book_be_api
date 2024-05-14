import jwt from "jsonwebtoken";

export const generalAccessToken = (payload: any): string => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    "access_token",
    { expiresIn: "12h" }
  );
  return access_token;
};
