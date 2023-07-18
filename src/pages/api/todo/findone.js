import { NextResponse } from "next/server";
import { errorHandler } from "../../../../middlewares/errorHanlder";
import TodoModel from "../../../../models/TodoModel";
import dbConnect from "../../../../utils/dbConnect";

export default async function GET(req, res) {
  try {
    dbConnect();
    if (req.method !== "POST") {
      errorHandler(res, 401, "Only Get Method is allowed");
    }
    const { id } = req.body;
    const list = await TodoModel.findById(id);
    if (!list) {
      errorHandler(res, 404, "List Not found...");
    }
    return res.status(200).json({ success: true, msg: "Found", list });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
}
