import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { generateHash } from "../utils/BcryptUtils";

class AuthController {
  async signUp(req: Request, res: Response) {
    const body = req.body;

    if (!body.email || !body.name || !body.password) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
      return;
    }

    const hashPassword = await generateHash(body.password);
    if (!hashPassword) {
      res.json({
        status: "error",
        message: "Erro ao criptografar senha ...",
      });
    }

    try {
      const result = await AuthService.signUp({
        name: body.name,
        email: body.email,
        password: hashPassword as string
      });
      res.json({
        status: "ok",
        token: result?.token,
        user: result?.user,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
      return;
    }

    try {
      const result = await AuthService.signIn(email, password);
      if (result) {
        res.json({
          status: "ok",
          token: result.token,
          user: result.user,
        });
      } else {
        res.json({
          status: "error",
          message: "Credenciais inválidas",
        });
      }
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new AuthController();