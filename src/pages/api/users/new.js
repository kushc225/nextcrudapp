import dbConnect from "../../../../utils/dbConnect";
import UserModel from "../../../../models/UserModel";
import bcrypt from "bcryptjs";
import { errorHandler } from "../../../../middlewares/errorHanlder";
export default async function New(req, res) {
  try {
    if (req.method !== "POST") {
      errorHandler(res, 401, "Only Post Request allowed");
    }
    await dbConnect();
    const { username, email, password } = req.body;
    let userExist = await UserModel.findOne({ email });
    if (userExist) {
      return errorHandler(res, 401, "Email Already Exists !");
    }
    userExist = await UserModel.findOne({ username });
    if (userExist) {
      return errorHandler(res, 401, "Username Already Exists !");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await new UserModel({
      username,
      email,
      password: hashedPass,
    });
    const data = await newUser.save();
    res
      .status(200)
      .json({ success: true, msg: "User Created Successfully", data });
  } catch (err) {
    res.status(500).json({ success: false, sdf: "lsdjf", msg: err.message });
  }
}
