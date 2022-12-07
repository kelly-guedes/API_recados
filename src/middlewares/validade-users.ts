import { NextFunction, Request, Response } from "express";

export class ValidateUserMiddleware {
  validateUser(request: Request, response: Response, next: NextFunction) {
    const { name, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: "O campo nome é obrigatório" });
    }
    if (name?.length < 3) {
      return response
        .status(400)
        .json({ error: "O nome deve conter pelo menos 3 caracters" });
    }

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
