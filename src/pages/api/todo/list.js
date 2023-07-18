import { errorHandler } from "../../../../middlewares/errorHanlder";
import TodoModel from "../../../../models/TodoModel";
import Jwt from "jsonwebtoken";
import dbConnect from "../../../../utils/dbConnect";
export default async function showList(req, res) {
  try {
    dbConnect();
    if (req.method !== "GET") {
      errorHandler(res, 401, "Only Get Method is allowed");
    }
    const token = req.headers.cookie.split("=")[1];
    const dToken = await Jwt.verify(token, process.env.JWT_SEC_KEY);

    const owner = dToken.id;
    const list = await TodoModel.find({ owner });
    return res.status(200).json({ success: true, msg: "List", list });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
}
