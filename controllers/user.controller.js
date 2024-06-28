const CustomError = require("../utils/CustomError");
const UserServices = require("../services/user.services");
const bcrypt = require("bcrypt");

class UserController {
  static async createUser(req, res, next) {
    try {
      const { email, password, ...otherFields } = req.body;

      if (await UserServices.FindEmail(email)) {
        return next(new CustomError("email already exist", 409));
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await UserServices.CreateUser({
        ...otherFields,
        email,
        password: hashedPassword,
      });

      res.json({
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  }
}

module.exports = UserController;
