import { errorHandler } from "../../../../../middlewares/errorHanlder";
import TodoModel from "../../../../../models/TodoModel";
export default async function DELETE(req, res) {
  try {
    if (req.method !== "DELETE") {
      errorHandler(res, 401, "Only DELETE method is allowed");
    }
    const id = req.query.id;

    const existTodo = await TodoModel.findById(id);
    if (!existTodo) {
      errorHandler(res, 404, "List not found...");
    }
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true, deletedTodo });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
}
