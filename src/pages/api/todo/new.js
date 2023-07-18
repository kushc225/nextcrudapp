import Jwt from "jsonwebtoken";
import { errorHandler } from "../../../../middlewares/errorHanlder";
import TodoModel from "../../../../models/TodoModel";

export default async function newTodo(req, res) {
  try {
    const { title, description } = req.body;
    const token = req.headers.cookie.split("=")[1];
    const dToken = await Jwt.verify(token, process.env.JWT_SEC_KEY);

    const owner = dToken.id;
    const newTodo = await new TodoModel({ owner, title, description });
    const data = await newTodo.save();
    return res
      .status(200)
      .json({ success: true, msg: "Task Added Successfully...", data });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
}
