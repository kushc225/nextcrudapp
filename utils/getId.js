import Jwt from "jsonwebtoken";

export default async function getId(req) {
  const token = req.headers.cookie.split("=")[1];
  const dtoken = await Jwt.verify(token, process.env.JWT_SEC_KEY);

  return dtoken;
}
