import { Request, Response, NextFunction } from "express";
import { UserEntity } from "../database/entities/user-entity";
import { pgHelper } from "../database/pg-helper";

export class VerifyUserNotesMiddleware {
  async verifyUserNotes(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { userId } = request.params;

    const manager = pgHelper.client.manager;

    const userFound = await manager.findOne(UserEntity, {
      where: {
        id: userId,
      },
    });

    if (!userFound) {
      return response.status(404).json({ message: "Usuário não encontrado." });
    }

    next();
  }
}
