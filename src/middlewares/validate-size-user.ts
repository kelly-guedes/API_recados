import { NextFunction, Request, Response } from "express";

export class ValidateSizeUserMiddleware {
  validateSizeUser(request: Request, response: Response, next: NextFunction) {
    const nome = request.body.name as string;
    if (nome?.length < 3) {
      return response
        .status(400)
        .json({ error: "O nome deve conter pelo menos 3 caracters" });
    }
    next();
  }
}
