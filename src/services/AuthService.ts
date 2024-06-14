import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || "secret";

class AuthService {
  constructor() { }

  async signIn(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Senha incorreta");
      }

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      return { token, user };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async signUp(user: Prisma.UserCreateInput) {
    try {
      const newuser = await prisma.user.create({ data: user });
      const token = jwt.sign({ id: newuser.id, email: newuser.email }, SECRET_KEY, { expiresIn: '1h' });
      return { token, user: newuser };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new AuthService();