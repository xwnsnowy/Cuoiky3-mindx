import User from "../models/User.js";
import { token } from "../utils/jwt.js";
import { validBody } from "../utils/validBody.js";
import { loginSchema } from "../validations/auth.js";

export const login = async (req, res, next) => {
  try {
    /**
     * 1. Validate request body
     * 2. Check if username exists
     * 3. Compare password
     * 4. Generate token
     * 5. Response token, user info
     */

    const { username, password } = req.body;
    const errors = validBody(req.body, loginSchema);
    if (errors) {
      return res.status(400).json({
        message: "Validation errors",
        errors,
      });
    }

    // 2. Check user exists
    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(400).json({
        message: "Username is not found",
      });
    }
    // 3. Check password (using simple comparison)
    if (userExist.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    // 4. Generate token
    const accessToken = token({ _id: userExist._id }, "1h");
    // 5. Response token, user info
    userExist.password = undefined;
    return res.status(200).json({
      message: "Login successfully!",
      accessToken,
      user: userExist,
    });
  } catch (error) {
    next(error);
  }
};
