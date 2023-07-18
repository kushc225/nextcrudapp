import { errorHandler } from "../../../../middlewares/errorHanlder";
import UserModel from "../../../../models/UserModel";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import dbConnect from "../../../../utils/dbConnect";
import { cookieSetter } from "../../../../utils/cookies";
dotenv.config();
export default async function login(req, res) {
  try {
    await dbConnect();
    if (req.method !== "POST") {
      errorHandler(res, 404, req.email);
    }
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      errorHandler(res, 404, "User Not found");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      errorHandler(res, 400, "Invalid Credentials...");
    }
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = await Jwt.sign(payload, process.env.JWT_SEC_KEY);
    cookieSetter(res, token, true);

    return res
      .status(200)
      .json({ success: true, msg: "Login Successfull", token });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
}
