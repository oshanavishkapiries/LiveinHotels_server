const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserServices {
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
}

module.exports = UserServices;
