const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserServices {
  static async getAllUsers() {
    return prisma.user.findMany({
      where: {
        status: "active",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        user_type: true,
        date_of_birth: true,
        login_with: true,
        about: true,
        status: true,
        created: true,
        modified: true,
      },
    });
  }

  static async getUserById(id) {
    return prisma.user.findUnique({
      where: {
        id,
        status: "active",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        user_type: true,
        date_of_birth: true,
        login_with: true,
        facebook_id: true,
        twitter_id: true,
        about: true,
        status: true,
        created: true,
        modified: true,
      },
    });
  }

  static async FindEmail(email) {
    return prisma.user.findFirst({
      where: {
        email,
        status: "active",
      },
    });
  }

  static async CreateUser(data) {
    return prisma.user.create({
      data,
    });
  }

  static async UpdateUser(id, data) {
    return prisma.user.update({
      where: { id: id, status: "active" },
      data,
    });
  }

  static async DeleteUser(id) {
    return prisma.user.update({
      where: { id: id, status: "active" },
      data: {
        status: "deleted",
      },
    });
  }
}

module.exports = UserServices;
