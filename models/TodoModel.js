import mongoose from "mongoose";
const todoSchema = mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
});

const TodoModel = mongoose.models.list || mongoose.model("list", todoSchema);

export default TodoModel;
