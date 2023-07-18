import { errorHandler } from "../../../../middlewares/errorHanlder";
import TodoModel from "../../../../models/TodoModel";
import dbConnect from "../../../../utils/dbConnect";

export default async function newTodo(req, res) {
  try {
    if (req.method !== "PUT") {
      errorHandler(res, 401, "Only PUT method is required");
    }
    dbConnect();
    const { id, title, description } = req.body;
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, {
      $set: { title, description },
    });
    const updatedTaks = await updatedTodo.save();
    return res.status(200).json({
      success: true,
      msg: "Task Updated Successfully...",
      updatedTaks,
    });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
}
