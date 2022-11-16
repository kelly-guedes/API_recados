import { NextFunction, Request, Response } from "express";

export class ValidateLoginMiddleware {
  validateLogin(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    if (!email) {
      return response
        .status(400)
        .json({ error: "O campo email é obrigatório" });
    }

    if (!password) {
      return response
        .status(400)
        .json({ error: "O campo senha é obrigatório" });
    }

    next();
  }
}
