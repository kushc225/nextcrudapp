import { errorHandler } from "../../../../middlewares/errorHanlder";
import { cookieSetter } from "../../../../utils/cookies";
export default async function logout(req, res) {
  try {
    cookieSetter(res, "", false);
    return res.status(200).json({ success: true, msg: "Logout" });
  } catch (err) {
    errorHandler(res, 500, err.message);
  }
}
