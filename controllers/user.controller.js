const CustomError = require("../utils/CustomError");
const UserServices = require("../services/user.services");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const sendMail = require("../utils/email/sendMail");
const generateOTP = require("../utils/email/generateOTP");
const setCookie = require("../utils/setCookie");

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserServices.getAllUsers();
      res.json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }
  static async getUserById(req, res, next) {
    try {
      const user = await UserServices.getUserById(req.params.id);
      if (!user) {
        return next(new CustomError("User not found", 404));
      }
      res.json({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }
  static async createUser(req, res, next) {
    try {
      const { email, password, ...otherFields } = req.body;

      if (await UserServices.FindEmail(email)) {
        return next(new CustomError("email already exist", 409));
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = generateOTP(6);

      const activateToken = jwt.signJwt(
        {
          code: otp,
          dto: {
            ...otherFields,
            email,
            password: hashedPassword,
          },
        },
        "5m"
      );

      const emailData = await sendMail({
        to: email,
        subject: "Activate Your Account",
        templateName: "activateOTP",
        data: {
          name: otherFields.firstName,
          otp: otp,
        },
      });

      if (!emailData) {
        return next(new CustomError("email send failed", 500));
      }

      setCookie(res, "activationToken", activateToken, "5m");

      res.json({
        success: true,
        message: "Sent activation email successfully",
        data: {
          activateToken,
        },
      });
    } catch (error) {
      console.log(error);
      return next(new CustomError(error.message, 500));
    }
  }
  static async updateUser(req, res, next) {
    try {
      const id = req.params.id;
      const { email, password, ...otherFields } = req.body;

      // if (!(req.params.id === req.user.id)) {
      //  return next(
      //     new CustomError("You are not authorized to update this user", 500)
      //   );
      // }
      if (email) {
        return next(new CustomError("Email cannot be updated", 500));
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const findUser = await UserServices.getUserById(id);

      if (!findUser) {
        return next(new CustomError("user not found", 500));
      }

      const updatedUser = await UserServices.UpdateUser(id, {
        ...otherFields,
        password: hashedPassword,
      });

      res.json({
        status: true,
        message: "User updated successfully",
        updatedUser,
      });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const user = await UserServices.getUserById(req.params.id);
      if (!user) {
        return next(new CustomError("User not found", 404));
      }
      await UserServices.DeleteUser(req.params.id);
      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }

  static async activateUser(req, res, next) {
    try {
      const activationToken = req.cookies.activationToken;
      const code = req.body.code;

      if (!activationToken) {
        return next(new CustomError("no activation token found", 401));
      }

      if (!code) {
        return next(new CustomError("{code:''} is required", 400));
      }

      const decodedToken = jwt.verifyJwt(activationToken);

      if (!decodedToken) {
        return next(new CustomError("invalid activation token", 400));
      }

      if (await UserServices.FindEmail(decodedToken.dto.email)) {
        return next(new CustomError("email already exist", 409));
      }

      if (!(code === decodedToken.code)) {
        return next(new CustomError("activation code does not match", 400));
      }

      const createUser = await UserServices.CreateUser(decodedToken.dto);

      if (!createUser) {
        return next(new CustomError("User creation failed", 500));
      }

      res.json({
        success: true,
        message: "user created successfully",
        data: {
          createUser,
        },
      });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }
}

module.exports = UserController;
