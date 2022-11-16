import { NextFunction, Request, Response } from "express";

export class VerifyArchivedParamsMiddleware {
  verifyArchivedParams(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { archived } = request.body;

    if (archived !== true && archived !== false) {
      return response.status(400).json({ error: "Status é obrigatório" });
    }

    next();
  }
}
