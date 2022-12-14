import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

export class ValidateUserIdSizeMiddware {
  verifySizeUUIDUser(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    if (userId.length != 36) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }
    next();
  }
  verifySizeUUIDNote(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    if (id.length != 36) {
      return response.status(404).json({ error: "Nota não encontrado" });
    }
    next();
  }
}
